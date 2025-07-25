import {
  configureStore,
  combineSlices
} from "@reduxjs/toolkit"
import { charactersSlice } from "../features/characters/charactersSlice"
import { characterApi } from "../services/character/characterApi"

const rootReducer = combineSlices({
  characters: charactersSlice.reducer,
  [characterApi.reducerPath]: characterApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      characterApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
 