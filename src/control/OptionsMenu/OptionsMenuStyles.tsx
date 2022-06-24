import {BUTTON_BACKGROUND, BUTTON_FONT, BUTTON_TEXT_COLOR, WIDTH} from "../../store/constants"

export function menuStyles() {
    return {
        minWidth: WIDTH,
        width: WIDTH,
        display: "flex",
        justifyContent: "flex-end",
        position: "relative" as "relative"
    }
}

export function buttonStyles() {
    return {
        backgroundColor: BUTTON_BACKGROUND,
        paddingTop: "2%",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        color: BUTTON_TEXT_COLOR,
        fontFamily: BUTTON_FONT,
        position: "relative" as "relative"

    }
}
