import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { useGetCharactersQuery } from '../../services/character/characterApi';
import { useEffect } from 'react';
import {
    charactersReceived,
    charactersSelectors
} from './charactersSlice';

export const CharactersTableContainer = () => {
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

    if (isUninitialized || isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Something went wrong...</p>
    }

    return (
        <div>
            {characters.map((character) => (
                <p key={character.id}>{character.name}</p>
            ))}
        </div>
    )
}