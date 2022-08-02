import TextField from "@mui/material/TextField"
import {NAV_BAR_HEIGHT, BACKGROUND_COLOR, SHADOW} from "../../../../utils/constants"
import {PAGE_WIDTH} from "../../utils/constants"
import {CSSProperties} from "react"

export default function styles() {
    return {
        mainDiv: {
             position: "absolute" as "absolute",
             top: NAV_BAR_HEIGHT,
             justifyContent: "center",
             display: "flex",
             minWidth: "100%",
             minHeight: "calc(100% - " + NAV_BAR_HEIGHT + ")"
        },
        centerDiv: {
            maxWidth: PAGE_WIDTH,
            alignItems: "center",
            display: "flex"
        }
    }
}

