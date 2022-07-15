import {styles} from "./NoteStyle"
import {useState, useEffect, useRef, memo} from 'react'
import {ResizerBar} from "../Resizer/ResizerBar"
import {NOTE_ID, NOTE_COLOR, NOTE_SELECT_COLOR} from "../../../utils/constants"
import {Button} from "@mui/material"
import {gsap} from "gsap"
import NoteProps from './NoteInterface'

export function Note({id, left, right, progress, setPlayNote, removeNote, moveNote} : NoteProps) {
    const timeline = useRef<any>();

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0});
    })

    const [isPlaying, setIsPlaying] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [leftChange, setLeftChange] = useState(0);
    const [rightChange, setRightChange] = useState(0);

    const [toDelete, setToDelete] = useState(false);
    const noteDiv = useRef<any>();

    const isPlayed = (offset : number) => {
        return (left <= offset && offset <= right);
    };

    useEffect(() => {
        setIsPlaying(isPlayed(progress));
    }, [progress]);

    useEffect(() => {
        setPlayNote(isPlaying);
    }, [isPlaying]);

    useEffect(() => {
        let color = NOTE_COLOR;
        if (isPlaying || isSelected) {
            color = NOTE_SELECT_COLOR;
        }
        noteDiv.current.style.backgroundColor = color;
    }, [isPlaying, isSelected])

    const onMouseDown = (event : any) => {
        event.stopPropagation();
        event.preventDefault();
        setIsSelected(true);
    }

    const resetBool = () => {
        if (isEditing) {
            moveNote(id, left, leftChange, right, rightChange);
            timeline.current.fromTo(noteDiv.current, {filter: "drop-shadow(0 0 1em rgb(0, 0, 0, 1.0))"}, {filter: "drop-shadow(0 0 1em rgb(0, 0, 0, 0))", repeat: 0, duration: 2, ease: "elastic.out(1, 0.4)"});
        }

        setIsEditing(false);
        setIsSelected(false);
        setLeftChange(0);
        setRightChange(0);
    };

    const onMouseUp = (event : any) => {
        if (toDelete) {
            removeNote(id);
        }
        resetBool();
        setToDelete(true);
        setTimeout(() => setToDelete(false), 300);
    }

    const onMouseMove = (event : any) => {
        event.stopPropagation();
        event.preventDefault();
        if (isSelected) {
            setIsEditing(true);
            setLeftChange((prev) => prev + event.movementX);
            setRightChange((prev) => prev + event.movementX);
        }
    }

    const onMouseLeave = (event : any) => {
        resetBool();
    }

    const onResize = (widthChange : number, left : number) => {
        if (isEditing) {
            if (left) {
                setLeftChange((prev) => prev + widthChange);
            } else {
                setRightChange((prev) => prev + widthChange);
            }

        }
    }

    const onResizeStart = (event : any) => {
        setIsEditing(true);
    }

    return (
        <div
        id={id}
        ref={noteDiv}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{...styles(isSelected),
                    left: `${left + (isEditing ? leftChange : 0)}px`,
                    minWidth: `${(right + (isEditing ? rightChange : 0)) - (left + (isEditing ? leftChange : 0))}px`}}>
            <ResizerBar id={`Resizers_${id}`} onResize={onResize} onResizeStart={onResizeStart}/>
        </div>
    );

}

