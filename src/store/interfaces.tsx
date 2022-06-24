import {INoteInfo} from "../music/Key/KeyInterface"

export interface INotes {
    [key: string]: {
        [key: string]: Array<INoteInfo>
    }
}