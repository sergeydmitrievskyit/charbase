import {
    createSlice,
    createEntityAdapter
 } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

interface Character {
    id: string,
    name: string,
    category: string[]
}

const charactersAdapter = createEntityAdapter<Character>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})
const initialState = charactersAdapter.getInitialState();

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        charactersReceived: charactersAdapter.setAll,
        characterAdded: charactersAdapter.addOne,
        characterUpdated: charactersAdapter.updateOne,
        characterRemoved: charactersAdapter.removeOne
    }
})

export const charactersSelectors = charactersAdapter.getSelectors<RootState>(
    (state) => state.characters,
)

export const {
    charactersReceived,
    characterAdded,
    characterRemoved,
    characterUpdated,
} = charactersSlice.actions;

export default charactersSlice.reducer