import { configureStore } from "@reduxjs/toolkit"
import charactersReducer from "../features/characters/charactersSlice"

export const store = configureStore({
  reducer: charactersReducer
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
 