import { useState, useRef, useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { useAppSelector } from "../../app/hooks"
import { useGetCharactersQuery } from "../../services/character/characterApi"
import {
  charactersReceived,
  characterRemoved,
  characterUpdated,
  charactersSelectors,
} from "./charactersSlice"
import { Table } from "./components/Table"
import { DeletePopup } from "./components/DeletePopup"
import { EditFormPopup } from "./components/EditFormPopup"
import type { Character, CharacterEditForm } from "../../types/character"
import type { SortOrder } from "primereact/api"
import type { DataTableStateEvent } from "primereact/datatable"
import { getSortedCharacters } from "./utils/get-sorted-characters"
import { Toast } from "primereact/toast"

export const CharactersContainer = () => {
  const dispatch = useAppDispatch()
  const { isLoading, isError, isUninitialized, data } = useGetCharactersQuery(undefined)
  const toast = useRef<Toast>(null)

  useEffect(() => {
    if (!data) {
      return
    }

    dispatch(charactersReceived(data))
  }, [data, dispatch])

  const characters = useAppSelector(charactersSelectors.selectAll)
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(
    null,
  )
  const [characterToEdit, setCharacterToEdit] = useState<Character | null>(null)
  const [sortField, setSortField] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOrder>(1)

  const handleDeleteButtonClick = (character: Character) => {
    setCharacterToDelete(character)
  }

  const handleDeleteReject = () => {
    setCharacterToDelete(null)
  }

  const handleDeleteConfirm = () => {
    if (!characterToDelete) {
      return
    }

    dispatch(characterRemoved(characterToDelete.id))
    toast.current?.show({
      severity: "warn",
      summary: "Delete",
      detail: `You have deleted ${characterToDelete.name}`,
      life: 2000,
    })
    setCharacterToDelete(null)
  }

  const handleEditButtonClick = (character: Character) => {
    setCharacterToEdit(character)
  }

  const handleEditSubmit = (characterChanges: CharacterEditForm) => {
    if (!characterToEdit) {
      return
    }

    dispatch(
      characterUpdated({
        id: characterToEdit.id,
        changes: {
          ...characterChanges,
        },
      }),
    )

    toast.current?.show({
      severity: "success",
      summary: "Edit",
      detail: `You have edited ${characterToEdit.name}`,
      life: 2000,
    })

    setCharacterToEdit(null)
  }

  const handleTableSort = (sortEvent: DataTableStateEvent) => {
    setSortField(sortEvent.sortField)
    setSortOrder(sortEvent.sortOrder ?? 0)
  }

  if (isUninitialized || isLoading) {
    return null
  }

  if (isError) {
    return <p>Something went wrong... Try to reload the page</p>
  }

  return (
    <div>
      <Toast ref={toast} />

      {characterToDelete && (
        <DeletePopup
          name={characterToDelete.name}
          onHide={handleDeleteReject}
          onAccept={handleDeleteConfirm}
          onReject={handleDeleteReject}
        />
      )}

      {characterToEdit && (
        <EditFormPopup
          onHide={() => {
            setCharacterToEdit(null)
          }}
          character={characterToEdit}
          onSubmit={handleEditSubmit}
        />
      )}

      <Table
        characters={getSortedCharacters(characters, sortField, sortOrder)}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleTableSort}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteButtonClick}
      />
    </div>
  )
}
