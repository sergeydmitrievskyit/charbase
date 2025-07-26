import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Character } from "../../types/character"
import type { PayloadAction, Update } from "@reduxjs/toolkit"

const charactersAdapter = createEntityAdapter<Character>()
const initialState = charactersAdapter.getInitialState()

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    charactersReceived: (state, action: PayloadAction<Character[]>) => {
      charactersAdapter.setAll(state, action.payload)
    },
    characterUpdated: (
      state,
      action: PayloadAction<Update<Character, number>>,
    ) => {
      charactersAdapter.updateOne(state, action.payload)
    },
    characterRemoved: (state, action: PayloadAction<number>) => {
      charactersAdapter.removeOne(state, action.payload)
    },
  },
})

export const charactersSelectors = charactersAdapter.getSelectors<RootState>(
  state => state.characters,
)

export const { charactersReceived, characterRemoved, characterUpdated } =
  charactersSlice.actions

export default charactersSlice.reducer
