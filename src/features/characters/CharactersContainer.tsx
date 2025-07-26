import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { useGetCharactersQuery } from '../../services/character/characterApi';
import { useEffect } from 'react';
import {
    charactersReceived,
    characterRemoved,
    characterUpdated,
    charactersSelectors
} from './charactersSlice';
import { Table } from './components/Table';
import { DeletePopup } from './components/DeletePopup';
import { EditFormPopup } from './components/EditFormPopup';
import {
    Character,
    CharacterEditForm
} from '../../types/character';
import { SortOrder } from 'primereact/api';
import { DataTableStateEvent } from "primereact/datatable";
import { getSortedCharacters } from '../../utils/get-sorted-characters';

export const CharactersContainer = () => {
    const dispatch = useAppDispatch();
    const {
        isLoading,
        isError,
        isUninitialized,
        data
    } = useGetCharactersQuery();

    useEffect(() => {
        if (!data) {
            return
        }

        dispatch(charactersReceived(data))
    }, [data, dispatch]);

    const characters = useAppSelector(charactersSelectors.selectAll)
    const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);
    const [characterToEdit, setCharacterToEdit] = useState<Character | null>(null);
    const [sortField, setSortField] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<SortOrder>(1)

    const handleDeleteButtonClick = (character: Character) => {
        setCharacterToDelete(character);
    }

    const handleDeleteReject = () => {
        setCharacterToDelete(null);
    }

    const handleDeleteConfirm = () => {
        if (!characterToDelete) {
            return
        }

        dispatch(characterRemoved(characterToDelete.id));
        setCharacterToDelete(null)
    }

    const handleEditButtonClick = (character: Character) => {
        setCharacterToEdit(character);
    }

    const handleEditSubmit = (characterChanges: CharacterEditForm) => {
        if(!characterToEdit) {
            return
        }
        
        dispatch(characterUpdated({
            id: characterToEdit.id,
            changes: {
                ...characterChanges
            } 
        }))
    }

    const handleTableSort = (sortEvent: DataTableStateEvent) => {
        setSortField(sortEvent.sortField)
        setSortOrder(sortEvent.sortOrder ? sortEvent.sortOrder : 0)
    }

    if (isUninitialized || isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Something went wrong...</p>
    }

    return (
        <div>
            { characterToDelete && <DeletePopup
                name={characterToDelete.name}
                onHide={handleDeleteReject}
                onAccept={handleDeleteConfirm}
                onReject={handleDeleteReject}/> }

            { characterToEdit && <EditFormPopup
                onHide={() => setCharacterToEdit(null)}
                character={characterToEdit}
                onSubmit={handleEditSubmit}/>
            }

            <Table
                characters={getSortedCharacters(characters, sortField, sortOrder)}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleTableSort}
                onEdit={handleEditButtonClick}
                onDelete={handleDeleteButtonClick} />
        </div>
    )
}