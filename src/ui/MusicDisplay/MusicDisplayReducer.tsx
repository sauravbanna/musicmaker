import makeInstrumentReducerAndActions from "../../music/Keys/KeysReducer"
import {INSTRUMENTS} from "../../store/constants"
import {combineReducers} from 'redux'

export interface IReducers {
    [key: string] : any;
}

interface IActions {
    [key: string] : {
        [key: string] : {
            [key: string] : any
        }
    }
}

function makeRootReducerAndActions() {
    let reducers : IReducers = {};
    let actions : IActions = {};

    INSTRUMENTS.map((ele) => {
        let reducerAndAction = makeInstrumentReducerAndActions();
        actions[ele] = reducerAndAction.actions;
        reducers[ele] = reducerAndAction.reducer;
    });

    return {
        reducer: combineReducers(reducers),
        actions: actions
    }
}

const {reducer, actions} = makeRootReducerAndActions();

export default actions

export const MusicReducer = reducer