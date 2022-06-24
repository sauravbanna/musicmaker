import { resizerStyles } from "./ResizerStyle"
import { useState } from "react"
import { ResizerProps } from './ResizerInterface'

export function Resizer({onMouseDown, onMouseMove} : ResizerProps) {

    const [hover, setHover] = useState(false);

    const onMouseEnter = () => {
        setHover(true);
    }

    const onMouseLeave = () => {
        setHover(false);
    }

    return (
        <div
            style={resizerStyles(hover)}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        ></div>
    );
}