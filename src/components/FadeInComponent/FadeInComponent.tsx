import IFadeInComponentProps from "./FadeInComponentInterface"
import {FADE_IN} from "../../utils/constants"
import {useEffect, useRef} from 'react'
import {gsap} from "gsap"


const FadeInComponent = ({index, children, style} : IFadeInComponentProps) => {
    const timeline = useRef<any>();
    const fadeDiv = useRef<any>();

    useEffect(() => {
        const fadeInDelay = index * FADE_IN / 3;
        timeline.current = gsap.timeline({repeat: 0}).fromTo(fadeDiv.current, {opacity: "0%"}, {opacity: "100%", duration: FADE_IN, delay: fadeInDelay / 1.5, repeat: 0, ease: "power1.out"});
    }, [])

    return (
        <div
            ref={fadeDiv}
            style={{...style}}
        >
            {children}
        </div>
    );
}

export default FadeInComponent