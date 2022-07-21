import {INoteInfo} from "./interfaces"
import {NOTE_INFO_LEFT_KEY as LEFT_KEY, NOTE_INFO_RIGHT_KEY as RIGHT_KEY} from "./constants"

const collisionAvoid = (prev : Array<INoteInfo>, left : number, leftChange : number, right : number, rightChange : number, totalWidth : number) => {
    let newLeft = left + leftChange;
    let newRight = right + rightChange;
    let newChange = 0;

    for (let i = 0; i < prev.length; i++) {
        let ele = prev[i];
        if (newLeft > ele[LEFT_KEY] && newRight < ele[RIGHT_KEY]) {
            return {[LEFT_KEY]: left, [RIGHT_KEY]: right};
        } else if (newLeft < ele[LEFT_KEY] && newRight > ele[RIGHT_KEY]) {
            return {[LEFT_KEY]: left, [RIGHT_KEY]: right};
        } else if (newLeft < ele[RIGHT_KEY] && newRight > ele[RIGHT_KEY]) {
            newChange = ele[RIGHT_KEY] - left;
            if (rightChange !== 0) {
                return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: right + newChange};
            } else {
                return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: right};
            }
        } else if (newLeft < ele[LEFT_KEY] && newRight > ele[LEFT_KEY]) {
            newChange = ele[LEFT_KEY] - right;
            if (leftChange !== 0) {
                return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: right + newChange};
            } else {
                return {[LEFT_KEY]: left, [RIGHT_KEY]: right + newChange};
            }
        }
    }

    if (newLeft < 0) {
        newChange = 0 - left;
        return {[LEFT_KEY]: 0, [RIGHT_KEY]: right + newChange};
    } else if (newRight >totalWidth) {
        newChange =  totalWidth - right;
        return {[LEFT_KEY]: left + newChange, [RIGHT_KEY]: totalWidth};
    } else {
        return {[LEFT_KEY]: newLeft, [RIGHT_KEY]: newRight};
    }
};


export default collisionAvoid