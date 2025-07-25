import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    characters: {}
}

const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {}
})

export default charactersSlice.reducer