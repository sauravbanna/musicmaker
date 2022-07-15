export function barStyles() {
    return {
        display: "flex",
        position: "absolute" as 'absolute',
        alignItems: "center",
        minWidth: "100%",
        minHeight: "100%",
        height: "100%",
        justifyContent: "space-between"
    }
}

export function resizerStyles(hover : boolean) {
    return {
        position: "relative" as "relative",
        display: "flex",
        minHeight: "100%",
        minWidth: "1em",
        cursor: "e-resize",
        backgroundColor: hover ? "rgb(227, 110, 89, 1)" : "rgb(227, 110, 89, 0)"
    }

}