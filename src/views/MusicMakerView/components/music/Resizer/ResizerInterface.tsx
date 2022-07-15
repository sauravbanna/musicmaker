export interface ResizerBarProps {
    id: string,
    onResizeStart: Function,
    onResize: Function
}

export interface ResizerProps {
    id: string,
    onMouseDown: (event : any) => void,
    onMouseMove: (event : any) => void
}