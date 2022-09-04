import {BACKGROUND, NAV_BAR_HEIGHT} from "../../utils/constants"

export default function styles() {
    return {
        position: "fixed" as "fixed",
        backgroundColor: "rgb(" + BACKGROUND + ", 0.45)",
        minWidth: "100%",
        height: NAV_BAR_HEIGHT,
        left: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        zIndex: 50
    }
}


export function elementStyles(hover: boolean) {
    return {
        paddingLeft: "1em",
        paddingRight: "1em",
        minHeight: "100%",
        backgroundColor: hover ? "rgba(0, 0, 0, 0.2)" : "transparent",
        color: "black",
        display: "flex",
        alignItems: "center"
    }
}