import {combineReducers} from 'redux'
import MusicMakerReducer from "../views/MusicMakerView/redux/MusicMakerReducer"
import LoginReducer from "../views/LoginRegisterView/redux/LoginReducer"

const rootReducer = combineReducers({
                                        musicMaker: MusicMakerReducer,
                                        login: LoginReducer
                                    });

export default rootReducer

