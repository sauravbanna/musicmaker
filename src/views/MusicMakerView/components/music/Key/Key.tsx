import {styles} from "./KeyStyle"
import {useState, memo, useRef, useEffect, useContext} from 'react'
import {shallowEqual} from 'react-redux'
import {isEqual} from 'lodash'
import {useAppSelector, useAppDispatch} from "../../../../../redux/reduxHooks"
import {Note} from "../Note/Note"
import _uniqueId from 'lodash/uniqueId'
import KeyProps from './KeyInterface'
import {INoteInfo, DefaultNoteInfo} from "../../../utils/interfaces"
import {notesSelector} from "../../../utils/MusicMakerSelectors"
import {NOTE_ID, NOTE_INFO_LEFT_KEY as LEFT_KEY, NOTE_INFO_RIGHT_KEY as RIGHT_KEY, ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, KEY_FADE_IN_LENGTH, NOTES} from "../../../utils/constants"
import MusicPlayer from "../MusicPlayer/MusicPlayer"
import {addAction, removeAction, editAction} from "../../../redux/notesReducer"
import {gsap} from "gsap"

function Key({instrument, note, progress, id, grey} : KeyProps) {
    const [playNote, setPlayNote] = useState<boolean>(false);

    const keyDiv = useRef<any>();
    const timeline = useRef<any>();

    const notes = useAppSelector((state : any) => notesSelector(state, instrument, note), shallowEqual);
    const dispatch = useAppDispatch();

    const [isDrawing, setIsDrawing] = useState(false);
    const [currentNoteInfo, setCurrentNoteInfo] = useState<INoteInfo>(DefaultNoteInfo);

    const removeNote = (id : string) => {
        dispatch(removeAction(instrument, note, id));
    };

    const moveNote = (id : string, left : number, leftChange : number, right : number, rightChange : number) => {
        dispatch(editAction(instrument, note, id, left, leftChange, right, rightChange, keyDiv.current.offsetX));

    }

    const makeNote = (id : string, left : number, right : number) => {
        return (
            <Note
                key={id}
                id={id}
                left={left}
                right={right}
                setPlayNote={setPlayNote}
                removeNote={removeNote}
                moveNote={moveNote}
                progress={progress}
            />
        );
    };


    let currentNote = currentNoteInfo ? makeNote(currentNoteInfo["id"], currentNoteInfo[LEFT_KEY], currentNoteInfo[RIGHT_KEY]) : null;

    const onMouseDown = (event : any) => {
        if (!isDrawing) {
            setIsDrawing(true);
            setCurrentNoteInfo((prev) => {
               return {
                    ...prev,
                    [LEFT_KEY]: event.nativeEvent.offsetX,
                    [RIGHT_KEY]: event.nativeEvent.offsetX
               };
            });
        }
    };

    const onMouseMove = (event : any) => {
        if (isDrawing) {
            setCurrentNoteInfo((prev) => {
                return {
                    ...prev,
                    [RIGHT_KEY]: prev[RIGHT_KEY] + event.movementX
                };
            });
        }
    };

    const onMouseUp = (event : any) => {
        if (isDrawing) {
            if (currentNoteInfo[RIGHT_KEY] - currentNoteInfo[LEFT_KEY] > 2) {
                dispatch(addAction(instrument,
                                    note,
                                    `${id}_Note_${_uniqueId()}`,
                                    currentNoteInfo[LEFT_KEY],
                                    currentNoteInfo[RIGHT_KEY]
                ));

           }
           setIsDrawing(false);
           setCurrentNoteInfo({...currentNoteInfo, [LEFT_KEY]: 0, [RIGHT_KEY]: 0});
        }
    };

    useEffect(() => {
        const fadeTime : number = KEY_FADE_IN_LENGTH / NOTES.length * 2;
        const delay : number = fadeTime * note / 2;
        timeline.current = gsap.timeline({repeat: 0})
                                .fromTo(keyDiv.current,
                                        {minWidth: "0%", width: "0%"},
                                        {
                                            minWidth: "100%",
                                            width: "100%",
                                            repeat: 0,
                                            duration: fadeTime,
                                            delay: delay,
                                            ease: 'none'
                                        }
                                );
    }, [])


    return (
        <div id={`Div_${id}`}
            ref={keyDiv}
            onMouseLeave={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={styles(grey, instrument)}>
                {notes.map((ele : INoteInfo) => makeNote(ele["id"], ele[LEFT_KEY], ele[RIGHT_KEY]))}
                {isDrawing ? currentNote : null}
                <MusicPlayer playNote={playNote} instrument={instrument} note={note} />
        </div>
    );
}


export const MemoKey = memo(Key);