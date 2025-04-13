import {Timestamp} from "firebase/firestore"

export interface ISongPreviewMiniProps {
    trackId: string,
    title: string,
    author: string,
    duration: string,
    authorId: string,
    image: string,
    liked: boolean
}

export interface ISongPreviewProps extends ISongPreviewMiniProps {
    date: Timestamp,
    likes: Array<string>,
    comments: Array<any>,
    index: number
}

export interface ISongPreviewButtonsProps {
    trackId: string,
    expanded: boolean,
    setExpand: Function,
    likes: number,
    comments: number,
    liked: boolean
}

export interface ISongCommentsProps {
    trackId: string,
    comments: Array<string>
}