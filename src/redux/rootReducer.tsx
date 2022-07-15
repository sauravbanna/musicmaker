import {combineReducers} from 'redux'
import MusicMakerReducer from "../views/MusicMakerView/redux/MusicMakerReducer"

const rootReducer = combineReducers({
                                        musicMaker: MusicMakerReducer
                                    });

export default rootReducer

