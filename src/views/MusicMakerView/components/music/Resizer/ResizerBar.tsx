import { useState } from 'react'
import { barStyles } from "./ResizerStyle"
import { Resizer } from "./Resizer"
import { ResizerBarProps } from './ResizerInterface'

export function ResizerBar({onResizeStart, onResize, id} : ResizerBarProps) {

    const onMouseDown = (event : any) => {
        event.stopPropagation();
        onResizeStart(event);
    };

    const onMouseMoveLeft = (event : any) => {
        onResize(event.movementX, true);
        event.stopPropagation();
        event.preventDefault();
    };

    const onMouseMoveRight = (event : any) => {
        onResize(event.movementX, false);
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <div id={`${id}_Bar`} style={barStyles()}>
            <Resizer
                id={`${id}_Left`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMoveLeft}/>
            <Resizer
                id={`${id}_Right`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMoveRight}/>
        </div>
    );
}