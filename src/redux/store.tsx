import {createStore} from 'redux'
import React from 'react'
import rootReducer from './rootReducer'

export const store = createStore(rootReducer);

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch