import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILoginState {
    state: string
}

const loginSlice = createSlice({
    name: "loggedIn",
    initialState: "",
    reducers: {
        logIn: {
            reducer: (state: string, {payload}: PayloadAction<ILoginState>) => {
                state = payload.state;
            },
            prepare: (userId: string) => {
                return {
                    payload: {
                        state: userId
                    }
                }
            },
        },
    },
})