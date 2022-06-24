import {NOTES, INSTRUMENTS, NOTE_INFO_LEFT_KEY as LEFT_KEY, NOTE_INFO_RIGHT_KEY as RIGHT_KEY, ADD_NOTE, REMOVE_NOTE, EDIT_NOTE} from "../../store/constants"
import {INoteInfo, INoteEditInfo} from "./KeyInterface"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Iid {
    id: string
}

export default function makeKeyReducerAndActions(key: number) {
    const keySlice = createSlice({
        name: `${key}`,
        initialState: [] as INoteInfo[],
        reducers: {
            [ADD_NOTE]: {
                reducer: (state : Array<INoteInfo>, {payload} : PayloadAction<INoteInfo>) => {
                    state.push(payload);
                },
                prepare: (id : string, left : number, right : number) => {
                    return {
                        payload : {
                            id,
                            left,
                            right
                        }
                    }
                },
            },
            [REMOVE_NOTE]: {
                reducer: (state: Array<INoteInfo>, {payload} : PayloadAction<Iid>) => {
                    return state.filter((ele) => {
                        return ele["id"] !== payload.id;
                    });
                },
                prepare: (id: string) => {
                    return {
                        payload: {
                            id
                        }
                    };
                },
            },
            [EDIT_NOTE]: {
                reducer: (state: Array<INoteInfo>, {payload} : PayloadAction<INoteEditInfo>) => {
                    const {info, leftChange, rightChange, totalWidth} = payload;
                    const {left, right, id} = info;
                    let tempNote : INoteInfo;
                    let newState = state.filter((ele) => {
                        return ele["id"] !== id;
                    });
                    let dimensions = collisionAvoid(newState, left, leftChange, right, rightChange, totalWidth);
                    newState.push({
                        id: id,
                        [LEFT_KEY]: dimensions[LEFT_KEY],
                        [RIGHT_KEY]: dimensions[RIGHT_KEY]
                    });
                    return newState;
                },
                prepare: (id, left, leftChange, right, rightChange, totalWidth) => {
                    return {
                        payload: {
                            info: {
                                id,
                                left,
                                right
                            },
                            leftChange,
                            rightChange,
                            totalWidth
                        }
                    }
                },
            },
        },
    });

    const {addNote, removeNote, editNote} = keySlice.actions;

    return {
        reducer: keySlice.reducer,
        actions: {
            [ADD_NOTE as string]: addNote,
            [REMOVE_NOTE as string]: removeNote,
            [EDIT_NOTE as string]: editNote
        }
    }
}

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