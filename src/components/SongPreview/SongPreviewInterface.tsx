export interface ISongPreviewMiniProps {
    title: string,
    author: string,
    duration: string,
    id: number,
    image: string
}

export interface ISongPreviewProps extends ISongPreviewMiniProps {
    date: string,
    likes: Array<string>,
    comments: Array<any>,
    index: number
}

export interface ISongPreviewButtonsProps {
    id: number,
    expanded: boolean,
    setExpand: Function,
    likes: number,
    comments: number
}

export interface ISongCommentsProps {
    id: number,
    comments: Array<string>
}