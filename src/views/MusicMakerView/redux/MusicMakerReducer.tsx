import {combineReducers} from 'redux'
import notesReducer from "./notesReducer"
import playReducer from "./PlayButtonReducer"

const musicMakerReducer = combineReducers({
                                        notes: notesReducer,
                                        play: playReducer,
                                    })

export default musicMakerReducer

