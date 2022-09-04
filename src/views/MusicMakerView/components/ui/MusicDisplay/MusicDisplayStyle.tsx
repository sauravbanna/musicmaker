import { BACKGROUND_COLOR, SHADOW, SHADOW_WIDTH } from "../../../../../utils/constants"
import { WIDTH, HEIGHT, BORDER_RADIUS } from "../../../utils/constants"

export function musicDisplayStyles() {
    const insetWidth = "-0.5em"

    return {
        backgroundColor: BACKGROUND_COLOR,
        position: "relative" as 'relative',
        height: HEIGHT,
        width: WIDTH,
        borderRadius: "1em",
        justifyContent: "space-evenly",
        alignItems: "center",
        boxShadow: SHADOW,
        clipPath: "inset(0px " + insetWidth + " " + insetWidth + " " + insetWidth + ")",
        display: "flex"
    }
}

export function musicAreaStyles() {
    return {
        position: "absolute" as "absolute",
        height: "90%",
        minWidth: "calc(100% - 2em)",
        overflow: "hidden",
        display: "flex",
        borderRadius: "0.4em"
    }
}