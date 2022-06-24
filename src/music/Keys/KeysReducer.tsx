import {IReducers} from "../../ui/MusicDisplay/MusicDisplayReducer"
import makeKeyReducerAndActions from "../Key/KeyReducer"
import {NOTES} from "../../store/constants"
import {combineReducers} from 'redux'

interface IInstrumentActions {
    [key: string] : {
        [key: string] : any
    }
}

export default function makeInstrumentReducerAndActions() {
    let actions : IInstrumentActions = {};
    let reducers : IReducers = {};

    NOTES.map((ele) => {
        let reducerAndAction = makeKeyReducerAndActions(ele);
        reducers[ele] = reducerAndAction.reducer;
        actions[ele] = reducerAndAction.actions;
    });

    return {
        reducer: combineReducers(reducers),
        actions: actions
    }

}
