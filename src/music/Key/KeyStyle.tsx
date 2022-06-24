import {notesSelectors, KEY_EVEN_COLOR, KEY_ODD_COLOR} from "../../store/constants"

export function styles(grey : boolean, instrument : string) {
    const height = 100 / notesSelectors(instrument).length;
    return {
        minWidth: "100%",
        display: "flex",
        position: "relative" as 'relative',
        backgroundColor: grey ? KEY_EVEN_COLOR : KEY_ODD_COLOR,
        minHeight: `${height}%`,

    }
}