import Divider from "@mui/material/Divider"
import {IAppDividerProps} from "./AppDividerInterface"
import {BACKGROUND_COLOR, FADE_IN, BUTTON_HOVER} from "../../utils/constants"
import {useRef, useEffect} from "react"
import {gsap} from "gsap"

function AppDivider({animate, orientation} : IAppDividerProps) {
    const dividerDiv = useRef<any>();
    const timeline = useRef<any>();

    useEffect(() => {
        if (animate) {
            const {center, delay} = animate;
            timeline.current = gsap.timeline({repeat: 0})
                                    .fromTo(dividerDiv.current,
                                            {
                                                maxWidth: "0%",
                                                left: center ? "50%" : "0%"
                                            },
                                            {
                                                maxWidth: "100%",
                                                left: "0%",
                                                duration: FADE_IN,
                                                repeat: 0,
                                                delay: delay ? delay : 0,
                                                ease: "power1.out"
                                            }
                                    )
        }
    }, [])

    return (
        <Divider
            ref={dividerDiv}
            orientation={orientation}
            variant="middle"
            flexItem
            sx={
                    {
                        borderBottomWidth: "0.15em",
                        borderRightWidth: "0.15em",
                        borderColor: BUTTON_HOVER,
                        borderRadius: "0.05em",
                        position: "relative"
                    }
                }
        />
    );
}

export default AppDivider