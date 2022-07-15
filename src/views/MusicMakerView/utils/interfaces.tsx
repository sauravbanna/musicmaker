import {NOTE_INFO_LEFT_KEY as LEFT_KEY, NOTE_INFO_RIGHT_KEY as RIGHT_KEY} from "./constants"

export interface INoteInfo {
    id : string,
    [LEFT_KEY] : number,
    [RIGHT_KEY] : number,
}

export const DefaultNoteInfo : INoteInfo = {
    id: "Node_Editing",
    [LEFT_KEY] : 0,
    [RIGHT_KEY] : 0
}

export interface INotesState {
    [key: string]: {
        [key: number]: Array<INoteInfo>
    }
}

export interface IInstrumentNotesState {
    [key: number]: Array<INoteInfo>
}

export interface INoteActionPayload {
    instrument: string,
    key: number,
    info: INoteInfo,
    changeInfo?: {
        leftChange: number,
        rightChange: number,
        totalWidth: number
    }
}

export interface INoteEditActionPayload extends INoteActionPayload{
    changeInfo: {
            leftChange: number,
            rightChange: number,
            totalWidth: number
        }
}

export interface INoteImportActionPayload {
    notes: INotesState
}
