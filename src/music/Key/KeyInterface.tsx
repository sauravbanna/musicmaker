import {NOTE_INFO_LEFT_KEY as LEFT_KEY, NOTE_INFO_RIGHT_KEY as RIGHT_KEY} from "../../store/constants"
import {createSelector} from 'reselect'
import {RootState} from "../../store/store"

export default interface KeyProps {
    instrument: string,
    note: number,
    progress: number,
    id: string,
    grey: boolean,
}

export interface INoteInfo {
    id : string,
    [LEFT_KEY] : number,
    [RIGHT_KEY] : number,
}

export interface INoteEditInfo {
    info: INoteInfo,
    leftChange: number,
    rightChange: number,
    totalWidth: number

}

export const DefaultNoteInfo : INoteInfo = {
    id: "Node_Editing",
    [LEFT_KEY] : 0,
    [RIGHT_KEY] : 0
}

export interface NoteAction {
    payload: INoteInfo
}

export const notesSelector = (instrument : string, note : number) =>
    createSelector(
        (state : any) => state.notes,
        (notes : any) => notes[instrument][note]
    );

