import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILoginState {
    username: string,
    userId: string
}

const defaultState : ILoginState = {username: "", userId: ""}

const loginSlice = createSlice({
    name: "loggedIn",
    initialState: defaultState,
    reducers: {
        logIn: {
            reducer: (state: ILoginState, {payload}: PayloadAction<any>) => {
                return {
                    username: payload.username,
                    userId: payload.userId
                };
            },
            prepare: (userId: string, username: string) => {
                return {
                    payload: {
                        username,
                        userId
                    }
                }
            },
        },
    },
})

export const {logIn} = loginSlice.actions;

export default loginSlice.reducer;