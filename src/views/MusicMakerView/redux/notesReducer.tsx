import {NOTES, INSTRUMENTS, NOTE_INFO_LEFT_KEY as LEFT_KEY, NOTE_INFO_RIGHT_KEY as RIGHT_KEY} from "../utils/constants"
import collisionAvoid from "../utils/collisionAvoid"
import { INotesState, IInstrumentNotesState, INoteInfo, INoteActionPayload, INoteEditActionPayload, INoteImportActionPayload} from "../utils/interfaces"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const makeDefaultState = () => {
    let defaultState : INotesState = {};

    INSTRUMENTS.map((ele : string) => {
        let instrumentNotes : IInstrumentNotesState = {};
        NOTES.map((noteEle : number) => {
            instrumentNotes = {
                ...instrumentNotes,
                [noteEle]: [] as INoteInfo[]
            }
        });
        defaultState = {
            ...defaultState,
            [ele]: instrumentNotes
        }
    });
    return defaultState;
}

const keySlice = createSlice({
        name: "notes",
        initialState: makeDefaultState(),
        reducers: {
            addAction: {
                reducer: (state : INotesState, {payload} : PayloadAction<INoteActionPayload>) => {
                    state[payload.instrument][payload.key].push(payload.info);
                },
                prepare: (instrument: string, key: number, id : string, left : number, right : number) => {
                    return {
                        payload : {
                            instrument,
                            key,
                            info: {
                                id,
                                left,
                                right
                            }
                        }
                    }
                },
            },
            removeAction: {
                reducer: (state: INotesState, {payload} : PayloadAction<INoteActionPayload>) => {
                    let newArray = state[payload.instrument][payload.key].filter((ele) => {
                                                                                        return ele["id"] !== payload.info.id;
                                                                                    });
                    state[payload.instrument][payload.key] = newArray;
                },
                prepare: (instrument: string, key: number, id: string) => {
                    return {
                        payload: {
                            instrument,
                            key,
                            info: {
                                id,
                                left: 0,
                                right: 0
                            }
                        }
                    };
                },
            },
            editAction: {
                reducer: (state: INotesState, {payload} : PayloadAction<INoteEditActionPayload>) => {
                    const {info, changeInfo} = payload;
                    const {left, right, id} = info;
                    const {leftChange, rightChange, totalWidth} = changeInfo;
                    let tempNote : INoteInfo;
                    let newArray = state[payload.instrument][payload.key].filter((ele) => {
                        return ele["id"] !== id;
                    });
                    let dimensions : any = collisionAvoid(newArray, left, leftChange, right, rightChange, totalWidth);
                    newArray.push({
                        id: id,
                        [LEFT_KEY]: dimensions[LEFT_KEY],
                        [RIGHT_KEY]: dimensions[RIGHT_KEY]
                    });
                    state[payload.instrument][payload.key] = newArray;
                    return state;
                },
                prepare: (instrument: string, key: number, id: string, left: number, leftChange: number, right: number, rightChange: number, totalWidth: number) => {
                    return {
                        payload: {
                            instrument,
                            key,
                            info: {
                                id,
                                left,
                                right
                            },
                            changeInfo: {
                                leftChange,
                                rightChange,
                                totalWidth
                            }
                        }
                    }
                },
            },
            importAction: {
                reducer: (state: INotesState, {payload} : PayloadAction<INoteImportActionPayload>) => {
                    return payload.notes;
                },
                prepare: (notes: INotesState) => {
                    return {
                        payload: {
                            notes
                        }
                    }
                }
            }
        },
    });


export const {addAction, removeAction, editAction, importAction} = keySlice.actions;

export default keySlice.reducer