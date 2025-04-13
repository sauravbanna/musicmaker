import {getAuth} from "firebase/auth"
import {database} from "../utils/config"
import {doc, setDoc, serverTimestamp} from "firebase/firestore"

const sendComment = (username: string, comment: string, trackId: string) => {
    const auth = getAuth();

    if (auth.currentUser != null) {
        return setDoc(doc(database, "feedback", trackId.trim()), {
            comments: {
                [auth.currentUser.uid]: {
                    username,
                    comment,
                    date: serverTimestamp()
                }
            }
        }, {merge: true})
    } else {
        return Promise.reject('not-logged-in')
    }
}