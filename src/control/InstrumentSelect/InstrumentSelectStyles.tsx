import {BUTTON_BACKGROUND, BUTTON_FONT, BUTTON_TEXT_COLOR} from "../../store/constants"

export function styles(active : boolean) {
    return {
        backgroundColor: active ? BUTTON_BACKGROUND : "transparent",
        paddingBottom: "2%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        color: BUTTON_TEXT_COLOR,
        fontFamily: BUTTON_FONT
    }
}