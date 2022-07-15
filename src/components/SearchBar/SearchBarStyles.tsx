import {CSSProperties} from 'react'

export default function styles(width: string): CSSProperties {
    return {
        boxSizing: "border-box",
        maxHeight: "100%",
        minWidth: width,
        width: width,
        display: "flex",
        alignItems: "center"
    }
}