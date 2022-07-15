import {NAV_BAR_HEIGHT, SHADOW} from "../../utils/constants"


export function accordionSummaryStyles() {
    return {
       maxHeight: "100%",
       minHeight: "100%",
       '&.Mui-expanded': {
           maxHeight: "100%",
           minHeight: "100%"
       },
       borderRadius: "0.5em",
       borderBottomRightRadius: "0em",
       borderBottomLeftRadius: "0em"
   }
}

export function accordionDetailsStyles() {
    return {
       padding: "0em",
       backgroundColor: "white",
       borderRadius: "0.5em",
       borderTopRightRadius: "0em",
       borderTopLeftRadius: "0em",
       overflow: "hidden",
       boxShadow: SHADOW
   }
}

export function accordionStyles() {
    return {
        position: "relative",
        borderRadius: "0.5em",
        height: "100%",
        backgroundColor: "transparent",
        boxShadow: "none"
    }
}

export function itemStyles(hover : boolean) {
    return {
        backgroundColor: hover ? "gainsboro" : "white",
        display: "flex",
        justifyContent: "center",
        paddingLeft: "0.7em",
        paddingRight: "0.7em",
        paddingTop: "0.4em",
        paddingBottom: "0.4em"
    }
}