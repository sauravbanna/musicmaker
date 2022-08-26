import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ILogInState {
    userId: string,
    username: string
}

const defaultState : ILogInState = {
    userId: "",
    username: ""
}

const loginSlice = createSlice({
    name: "loggedIn",
    initialState: defaultState,
    reducers: {
        logIn: {
            reducer: (state: ILogInState, {payload}: PayloadAction<any>) => {
                return payload.state;
            },
            prepare: (userId: string, username: string) => {
                return {
                    payload: {
                        state: {
                            userId,
                            username
                        }
                    }
                }
            },
        },
        logInUserId: {
            reducer: (state: ILogInState, {payload}: PayloadAction<any>) => {
                return {
                    userId: payload.userId,
                    username: ""
                }
            },
            prepare: (userId: string) => {
                return {
                    payload: {
                        userId
                    }
                }
            },
        },
        logInUsername: {
                    reducer: (state: ILogInState, {payload}: PayloadAction<any>) => {
                        return {
                            ...state,
                            username: payload.username
                        }
                    },
                    prepare: (username: string) => {
                        return {
                            payload: {
                                username
                            }
                        }
                    },
                },
    },
})

export const {logIn, logInUserId, logInUsername} = loginSlice.actions;

export default loginSlice.reducer;