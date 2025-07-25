import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { useGetCharactersQuery } from '../../services/character/characterApi';
import { useEffect } from 'react';
import {
    charactersReceived,
    characterRemoved,
    charactersSelectors
} from './charactersSlice';
import { Table } from './components/Table';
import { DeletePopup } from './components/DeletePopup';
import { Character } from '../../types/character';

export const CharactersContainer = () => {
    const dispatch = useAppDispatch();
    const {
        isLoading,
        isError,
        isUninitialized,
        data
    } = useGetCharactersQuery();
    const characters = useAppSelector(charactersSelectors.selectAll)
    const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);
    const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            dispatch(charactersReceived(data))
        }
    }, [data, dispatch]);

    const handleDeleteButtonClick = (character: Character) => {
        setCharacterToDelete(character);
        setDeletePopupVisible(true);
    }

    const handleDeleteReject = () => {
        setCharacterToDelete(null);
        setDeletePopupVisible(false);
    }

    const handleDeleteConfirm = () => {
        if (!characterToDelete) {
            return
        }

        dispatch(characterRemoved(characterToDelete.id));
        setCharacterToDelete(null)
        setDeletePopupVisible(false);
    }

    const handleEditButtonClick = (character: Character) => {
        console.log(character);
    }

    if (isUninitialized || isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Something went wrong...</p>
    }

    return (
        <div>
            <DeletePopup
                visible={deletePopupVisible}
                name={characterToDelete ? characterToDelete.name : ''}
                onHide={handleDeleteReject}
                onAccept={handleDeleteConfirm}
                onReject={handleDeleteReject}/>

            <Table
                characters={characters}
                onEdit={handleEditButtonClick}
                onDelete={handleDeleteButtonClick} />
        </div>
    )
}