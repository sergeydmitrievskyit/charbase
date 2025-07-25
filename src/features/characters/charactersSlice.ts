import {
    createSlice,
    createEntityAdapter
 } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { Character } from "../../types/character";

const charactersAdapter = createEntityAdapter<Character>()
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