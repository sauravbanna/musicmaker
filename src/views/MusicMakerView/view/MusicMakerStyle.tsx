import {APP_COLOR} from "../../../utils/constants"

export default function styles() {
    return {
        position: "absolute" as "absolute",
        top: "3%",
        left: "50%",
        right: "50%",
        height: "95vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column" as 'column'
    }
}

export function musicStyles() {
    return {
        alignItems: "center",
        display: "flex",
        flexDirection: "column" as "column"
    }
}