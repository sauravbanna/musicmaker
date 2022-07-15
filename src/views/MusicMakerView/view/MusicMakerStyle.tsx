import {APP_COLOR} from "../../../utils/constants"

export default function styles() {
    return {
        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column" as 'column',
        backgroundColor: APP_COLOR
    }
}

export function musicStyles() {
    return {
        alignItems: "center",
        display: "flex",
        flexDirection: "column" as "column"
    }
}