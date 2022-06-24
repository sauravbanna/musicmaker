import { WIDTH, HEIGHT, BACKGROUND_COLOR, BORDER_RADIUS } from "../../store/constants"

export function musicDisplayStyles() {
    return {
        backgroundColor: BACKGROUND_COLOR,
        position: "relative" as 'relative',
        height: "45vh",
        width: WIDTH,
        borderRadius: "1em",
        borderBottomRightRadius: 0,
        justifyContent: "space-evenly",
        alignItems: "center",
        display: "flex",
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