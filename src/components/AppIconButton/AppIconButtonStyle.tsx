import {BUTTON_HOVER} from "../../utils/constants"

export default function iconStyles(expanded: boolean, hover: boolean) {
    return {
        backgroundColor: expanded ? BUTTON_HOVER : "transparent",
        display: "flex",
        alignItems: "center",
        borderRadius: "0.2em",
        padding: "0.5em",
        paddingTop: "0.2em",
        paddingBottom: "0.2em",
        boxShadow: hover ? "0.05em 0.05em 0.1em rgb(0, 0, 0, 0.5)" : undefined
    }
}