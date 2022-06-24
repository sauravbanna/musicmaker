import {combineReducers} from 'redux'
import {MusicReducer} from "../ui/MusicDisplay/MusicDisplayReducer"
import {reducerWithImport} from "../control/OptionsMenu/OptionsMenuReducer"
import {playReducer} from "../control/PlayButton/PlayButtonReducer"

const rootReducer = combineReducers({
                                        notes:  reducerWithImport(MusicReducer),
                                        play: playReducer
                                    })

export default rootReducer

