import {NOTE_COLOR} from "../../../utils/constants"


export function styles(isEditing : boolean) {
    const grabCursor = isEditing ?
                        {
                            cursor: "grabbing"
                        }
                        :
                        {
                            cursor: "grab"
                        }


    return {
        minHeight: "100%",
        minWidth: "10%",
        overflow: "hidden",
        position: "absolute" as 'absolute',
        backgroundColor: NOTE_COLOR,
        borderRadius: "0.3em",
        ...grabCursor
    }
}