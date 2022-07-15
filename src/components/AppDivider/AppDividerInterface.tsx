interface IAnimateData {
    center: boolean,
    delay: number
}

export interface IAppDividerProps {
    animate?: IAnimateData,
    orientation: "horizontal" | "vertical",
    style?: any
}