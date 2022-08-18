import {BUTTON_BACKGROUND, BUTTON_HOVER, BUTTON_TEXT_COLOR, BUTTON_FONT} from "../../utils/constants"

export default function styles(hover: boolean, disableShadow?: boolean) {
    let returnStyles = {
        color: BUTTON_TEXT_COLOR,
        backgroundColor: hover ? BUTTON_HOVER : BUTTON_BACKGROUND
    };

    if (!disableShadow) {
        returnStyles = {...returnStyles,
            ...{boxShadow: "0.1em 0.1em 0.2em rgb(0, 0, 0, 0.6)",
            clipPath: "inset(-5px -5px -5px -5px)"}
        }
    }

    return returnStyles
}