import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { useGetCharactersQuery } from '../../services/character/characterApi';
import { useEffect } from 'react';
import {
    charactersReceived,
    charactersSelectors
} from './charactersSlice';
import { Table } from './components/Table';
import { Character, CharacterId } from '../../types/character';

export const CharactersContainer = () => {
    const dispatch = useAppDispatch();
    const {
        isLoading,
        isError,
        isUninitialized,
        data
    } = useGetCharactersQuery();
    const characters = useAppSelector(charactersSelectors.selectAll)

    useEffect(() => {
        if (data) {
            dispatch(charactersReceived(data))
        }
    }, [data, dispatch]);

    const handleEdit = (character: Character) => {
        console.log(character);
    }

    const handleDelete = (id: CharacterId) => {
        console.log(id)
    }


    if (isUninitialized || isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Something went wrong...</p>
    }

    return (
        <div>
            <Table
                characters={characters}
                onEdit={handleEdit}
                onDelete={handleDelete} />
        </div>
    )
}