import {INotes} from "../../store/interfaces"

export default interface IOptionsMenuProps {

}

export interface IImportAction {
    type: string,
    payload: INotes
}