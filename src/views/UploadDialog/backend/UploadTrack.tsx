// create a doc with random id
// put song info into that doc
// create new doc in notes collection with same id
// create new doc in feedback collection with same id
// put notes from global state into that doc

import {database, storage} from "../../../utils/config"
import {doc, setDoc, collection, serverTimestamp} from "firebase/firestore"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"



const uploadTrack = (title: string, description: string, image: File, notes: any, currentUser: any) => {
    const docId = doc(collection(database, "tracks")).id;

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
}

const uploadCoverArt = (docId: string, image: File) => {
    const fileExt = image.type.split("/")[1]

    const imageStorage = ref(storage, "coverArt/" + docId + "." + fileExt);

    console.log("coverArt/" + docId + "." + fileExt)

    return uploadBytes(imageStorage, image)
            .then((snapshot: any) => {
                return Promise.resolve(getDownloadURL(snapshot.ref));
            })
}

const makeNewTrack = (filename: string, title: string, description: string, docId: string, currentUser: any) => {
    return setDoc(doc(database, "tracks", docId), {
               title: title,
               description: description,
               image: filename,
               date: serverTimestamp(),
               username: currentUser.username,
               userId: currentUser.userId
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

export default uploadTrack
