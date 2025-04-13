import {Timestamp} from "firebase/firestore"
import {INotesState} from "../views/MusicMakerView/utils/interfaces"
import {INSTRUMENTS, NOTES} from "../views/MusicMakerView/utils/constants"


export function getErrorMessage(error: any) : string {
    if (error instanceof Error) return error.message;
    return String(error);
}

export function getTimeDiff(date : Timestamp) : string {
    const timeDiffMillis = Date.now() - date.toMillis();

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    if (Math.floor(timeDiffMillis / year) != 0) {
        const years = Math.floor(timeDiffMillis / year);
        return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (Math.floor(timeDiffMillis / day) != 0) {
       const days = Math.floor(timeDiffMillis / day);
       return `${days} day${days > 1 ? "s" : ""} ago`;
   } else if (Math.floor(timeDiffMillis / hour) != 0) {
      const hours = Math.floor(timeDiffMillis / hour);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return "Uploaded Recently"
  }


}

export function checkEmptyNotes(notes : INotesState) : boolean {
    let returnBool = true;

    INSTRUMENTS.forEach((instrument) => {
        NOTES.forEach((note) => {
            returnBool = returnBool && notes[instrument][note].length == 0;
        })
    })

    return returnBool;
}