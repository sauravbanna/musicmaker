import {getAuth} from "firebase/auth"
import {database} from "../utils/config"
import {doc, setDoc, deleteField} from "firebase/firestore"

export const like = (id: string, track: boolean) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser != null) {
        return setDoc(doc(database, "feedback", id.trim()), {
            likes: {
                [currentUser.uid]: 1
            }
        }, {merge: true})
            .then(() => {
                if (track) {
                    return setDoc(doc(database, "users", currentUser.uid), {
                        likedTracks: {
                            [id]: 1
                        }
                    }, {merge: true})
                }
            })
    } else {
        return Promise.reject('not-logged-in')
    }
}

export const unLike = (id: string, track: boolean) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser != null) {
        return setDoc(doc(database, "feedback", id.trim()), {
            likes: {
                [currentUser.uid]: deleteField()
            }
        }, {merge: true})
            .then(() => {
                if (track) {
                    return setDoc(doc(database, "users", currentUser.uid), {
                        likedTracks: {
                            [id]: deleteField()
                        }
                    }, {merge: true})
                }
            })
    } else {
        return Promise.reject('not-logged-in')
    }
}

