import {AnyAction} from 'redux'
import {IMPORT_NOTES} from '../../store/constants'

export function reducerWithImport(reducer : (state : any, action: AnyAction) => any) {
    return function(state : any, action: AnyAction) {
        switch(action.type) {
            case IMPORT_NOTES:
                return action.payload;
            default:
                return reducer(state, action);
        }
    }
}