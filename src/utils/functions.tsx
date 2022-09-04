import {Timestamp} from "firebase/firestore"
import {INotesState} from "../views/MusicMakerView/utils/interfaces"
import {INSTRUMENTS, NOTES} from "../views/MusicMakerView/utils/constants"


export function getErrorMessage(error: any) : string {
    if (error instanceof Error) return error.message;
    return String(error);
}

export function getTimeDiff(date : Timestamp) : string {
    const timeDiffMillis = Date.now() - date.toMillis();

    if (Math.floor(timeDiffMillis / (1000*60*60*24*365)) != 0) {
        return `${Math.floor(timeDiffMillis / (1000*60*60*24*365))} years ago`;
    } else if (Math.floor(timeDiffMillis / (1000*60*60*24)) != 0) {
       return `${Math.floor(timeDiffMillis / (1000*60*60*24))} days ago`;
   } else if (Math.floor(timeDiffMillis / (1000*60*60)) != 0) {
      return `${Math.floor(timeDiffMillis / (1000*60*60))} hours ago`;
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