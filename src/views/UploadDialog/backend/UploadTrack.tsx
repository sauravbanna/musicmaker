import {database, storage} from "../../../utils/config"
import {doc, setDoc, collection, serverTimestamp, updateDoc} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"



const uploadTrack = (title: string, description: string, image: File, notes: any, currentUser: any) => {
    const docId = doc(collection(database, "tracks")).id;

    return addTrackToUserDoc(docId, currentUser)
            .then(() => {
                return uploadCoverArt(docId, image)
                    .then((downloadUrl : string) => {
                        return makeNewTrack(downloadUrl, title, description, docId, currentUser)
                                .then(() => {
                                    return makeNewNotes(docId, notes)
                                            .then(() => {
                                                return makeNewFeedback(docId)
                                                    .then(() => {
                                                        return Promise.resolve(docId);
                                                    })
                                            })
                                })
                    });
            })



}

const uploadCoverArt = (docId: string, image: File) => {
    const fileExt = image.type.split("/")[1]

    const imageStorage = ref(storage, "coverArt/" + docId + "." + fileExt);

    console.log("coverArt/" + docId + "." + fileExt)

    return uploadBytes(imageStorage, image)
            .then((snapshot: any) => {
                return "coverArt/" + docId + "." + fileExt;
            })
}

const makeNewTrack = (filename: string, title: string, description: string, docId: string, currentUser: any) => {
    return setDoc(doc(database, "tracks", docId), {
               title: title,
               description: description,
               image: filename,
               date: serverTimestamp(),
               userId: currentUser.userId,
               username: currentUser.username
           })
}

const makeNewNotes = (docId: string, notes: any) => {
    return setDoc(doc(database, "notes", docId), {
               notes: notes
           })
}

const makeNewFeedback = (docId: string) => {
    return setDoc(doc(database, "feedback", docId), {
        likes: {},
        comments: {}
    })
}

const addTrackToUserDoc = (docId: string, currentUser: any) => {

    return setDoc(doc(database, "users", currentUser.userId), {
        tracks: {
            [docId]: 1
        }
    }, {merge: true})
}

export default uploadTrack
