import { DataTable } from "primereact/datatable"
import type { DataTableStateEvent } from "primereact/datatable"
import type { Character } from "../../../types/character"
import type { SortOrder } from "primereact/api"
import { Column } from "primereact/column"
import { Actions } from "./Actions"
import { Chip } from "primereact/chip"

type TableProps = {
  characters: Character[]
  sortField: string
  sortOrder: SortOrder
  onSort: (event: DataTableStateEvent) => void
  onEdit: (character: Character) => void
  onDelete: (character: Character) => void
}

export const Table = ({
  characters,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}: TableProps) => {
  const categoryBodyTemplate = (character: Character) => (
    <div className="flex flex-wrap gap-1 justify-start">
      {character.categories.map((category: string) => (
        <Chip key={category} label={category} />
      ))}
    </div>
  )

  const actionsBodyTemplate = (character: Character) => {
    return (
      <Actions
        onEdit={() => {
          onEdit(character)
        }}
        onDelete={() => {
          onDelete(character)
        }}
      />
    )
  }

  return (
    <div className="overflow-x-auto max-w-full sm:rounded-md">
      <DataTable
        tableClassName="table-fixed min-w-[400px]"
        value={characters}
        removableSort
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
      >
        <Column
          style={{ width: "40%" }}
          header="Name"
          field="name"
          bodyClassName="text-ellipsis whitespace-nowrap overflow-hidden"
          sortable
        />

        <Column
          style={{ width: "40%" }}
          header="Category"
          field="category"
          body={categoryBodyTemplate}
          sortable
        />

        <Column
          style={{ width: "120px" }}
          header="Actions"
          body={actionsBodyTemplate}
        />
      </DataTable>
    </div>
  )
}
