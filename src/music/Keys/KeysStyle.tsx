import {MUSIC_DISPLAY_STYLE} from "../../store/constants"

export function styles(active : boolean) {
    return {
        position: "absolute" as 'absolute',
        overflow: "hidden",
        display: "flex",
        minWidth: "100%",
        flexDirection: "column" as 'column',
        pointerEvents: active ? "auto" as 'auto' : "none" as 'none',
        visibility: active ? "initial" as 'initial' : "hidden" as 'hidden',
        minHeight: "100%",
        height: "100%"
    };
}