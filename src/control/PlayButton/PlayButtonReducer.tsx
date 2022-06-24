import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const playSlice = createSlice({
    name: "play",
    initialState: false,
    reducers: {
        togglePlay(state : boolean) {
            return !state;
        },
    },
})

export const {togglePlay} = playSlice.actions

export const playReducer = playSlice.reducer