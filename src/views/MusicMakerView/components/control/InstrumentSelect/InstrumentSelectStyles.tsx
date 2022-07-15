import {BUTTON_BACKGROUND, BUTTON_FONT, BUTTON_TEXT_COLOR, SHADOW} from "../../../../../utils/constants"

export function styles(active : boolean) {
    const insetWidth = "-0.5em"

    return {
        backgroundColor: active ? BUTTON_BACKGROUND : "transparent",
        paddingBottom: "2%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        color: BUTTON_TEXT_COLOR,
        fontFamily: BUTTON_FONT,
        boxShadow: active ? SHADOW : "none",
        clipPath: "inset(" + insetWidth + " " + insetWidth + " " + "-0.1px" + " " + insetWidth + ")"
    }
}