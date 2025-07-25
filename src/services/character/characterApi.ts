import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { Character } from '../../types/character'

interface CharacterResponse {
    id: number | string; // id - identificator
    n: string;           // n - name
    c: string[];         // c - category
}
type getCharactersResponseSchema = CharacterResponse[];

export const characterApi = createApi({
    reducerPath: 'characterApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/characters/' }),
    endpoints: (build) => ({
        getCharacters: build.query<Character[], void>({
            query: () => 'characters.json',
            transformResponse: (response: getCharactersResponseSchema): Character[] => {
                return response.map((item: CharacterResponse) => ({
                    id: Number(item.id),
                    name: item.n,
                    categories: item.c
                }));
            }
        }),
    }),
})

export const { useGetCharactersQuery } = characterApi