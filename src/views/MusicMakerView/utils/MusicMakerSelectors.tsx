import {createSelector} from 'reselect'

const musicMakerSelector = (state : any) => {
    return state.musicMaker;
}
export const allNotesSelector = (state : any) => musicMakerSelector(state).notes
export const playSelector = (state : any) => musicMakerSelector(state).play
export const notesSelector = (state : any, instrument : string, note : number) => allNotesSelector(state)[instrument][note]

