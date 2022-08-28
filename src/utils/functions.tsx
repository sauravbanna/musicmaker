import {Timestamp} from "firebase/firestore"

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
    return "bruh"
  }


}