import {NOTES, INSTRUMENTS, NOTE_INFO_LEFT_KEY as LEFT_KEY, NOTE_INFO_RIGHT_KEY as RIGHT_KEY} from "../utils/constants"
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
                    let dimensions = collisionAvoid(newArray, left, leftChange, right, rightChange, totalWidth);
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

const collisionAvoid = (prev : Array<INoteInfo>, left : number, leftChange : number, right : number, rightChange : number, totalWidth : number) => {
    let newLeft = left + leftChange;
    let newRight = right + rightChange;
    let newChange = 0;

    for (let i = 0; i < prev.length; i++) {
        let ele = prev[i];
        if (newLeft > ele[LEFT_KEY] && newRight < ele[RIGHT_KEY]) {
            return {[LEFT_KEY]: left, [RIGHT_KEY]: right};
        } else if (newLeft < ele[LEFT_KEY] && newRight > ele[RIGHT_KEY]) {
            return {[LEFT_KEY]: left, [RIGHT_KEY]: right};
        } else if (newLeft < ele[RIGHT_KEY] && newRight > ele[RIGHT_KEY]) {
            newChange = ele[RIGHT_KEY] - left;
            if (rightChange !== 0) {
                return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: right + newChange};
            } else {
                return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: right};
            }
        } else if (newLeft < ele[LEFT_KEY] && newRight > ele[LEFT_KEY]) {
            newChange = ele[LEFT_KEY] - right;
            if (leftChange !== 0) {
                return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: right + newChange};
            } else {
                return {[LEFT_KEY]: left, [RIGHT_KEY]: right + newChange};
            }
        }
    }

    if (newLeft < 0) {
        newChange = 0 - left;
        return {[LEFT_KEY]: 0, [RIGHT_KEY]: right + newChange};
    } else if (newRight >totalWidth) {
        newChange =  totalWidth - right;
        return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: totalWidth};
    } else {
        return {[LEFT_KEY]: newLeft, [RIGHT_KEY]: newRight};
    }
};

export const {addAction, removeAction, editAction, importAction} = keySlice.actions;

export default keySlice.reducer