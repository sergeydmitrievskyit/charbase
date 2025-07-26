import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Character } from "../../types/character"

type CharacterDTO = {
  id: number | string // id - identificator
  n: string // n - name
  c: string[] // c - category
}
type charactersDTO = CharacterDTO[]

export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/characters/" }),
  endpoints: build => ({
    getCharacters: build.query<Character[], undefined>({
      query: () => "characters.json",
      transformResponse: (response: charactersDTO): Character[] => {
        return response.map((item: CharacterDTO) => ({
          id: Number(item.id),
          name: item.n,
          categories: item.c,
        }))
      },
    }),
  }),
})

export const { useGetCharactersQuery } = characterApi
