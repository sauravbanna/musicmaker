import {Button} from "@mui/material"
import {PLAYHEAD_ID, PLAYTIME} from "../../../utils/constants"
import {memo, useEffect, useMemo, useRef, useState, useCallback} from 'react'
import {styles} from "./PlayHeadStyles"
import {gsap} from "gsap"
import {shallowEqual} from 'react-redux'
import {useAppSelector} from "../../../../../redux/reduxHooks"
import PlayHeadProps from './PlayHeadInterface'
import {playSelector} from "../../../utils/MusicMakerSelectors"


function PlayHead({setProgress} : PlayHeadProps) {
    const playHeadDiv = useRef<HTMLDivElement>(null);
    const timeline = useRef<any>();

    const play = useAppSelector(playSelector, shallowEqual);

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: -1, onUpdate: update}).to(playHeadDiv?.current, {duration: PLAYTIME, left: "100%", ease: "none"});
    }, []);

    useEffect(() => {
        if (!play) {
            timeline.current.pause();
        } else {
            timeline.current.resume();
        }
    });

    const update = () => setProgress(playHeadDiv.current?.offsetLeft);

    return (
        <div id={PLAYHEAD_ID} ref={playHeadDiv} style={styles()}></div>
    );

}

export const MemoPlayHead = memo(PlayHead);
