import {gsap} from "gsap"
import {useRef, useEffect, useState} from 'react'
import {SONG_PREVIEW_HEIGHT, FADE_IN} from "../utils/constants"

function useFadeInComponent (index: number) {
    const timeline = useRef<any>();
    const fadeDiv = useRef<any>();

    useEffect(() => {
        const fadeInDelay = index * FADE_IN / 3;
        timeline.current = gsap.timeline({repeat: 0}).fromTo(fadeDiv.current, {opacity: "0%"}, {opacity: "100%", duration: FADE_IN, delay: fadeInDelay / 1.5, repeat: 0, ease: "power1.out"});
    }, []);

    return fadeDiv;
}

export default useFadeInComponent