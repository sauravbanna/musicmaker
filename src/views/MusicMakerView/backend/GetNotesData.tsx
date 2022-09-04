import {database, storage} from "../../../utils/config"
import {doc, getDoc, Timestamp} from "firebase/firestore"
import {ref, getDownloadURL} from "firebase/storage"
import { INotesState } from "../utils/interfaces"

interface ITrackData {
    title: string,
    image: string,
    description: string,
    username: string,
    userId: string,
    date: Timestamp
}

interface ITrackDataWithFeedback extends ITrackData {
    likes: Array<string>,
    comments: Array<any>
}

export interface ITrackDataWithNotesAndFeedback extends ITrackDataWithFeedback {
    notes: INotesState
}

const getNotesData = (trackId : string) : Promise<ITrackDataWithNotesAndFeedback> => {
    return getDoc(doc(database, "tracks", trackId))
            .then((trackSnap: any) => {
                const trackData = trackSnap.data();
                return getDoc(doc(database, "notes", trackId))
                    .then((notesSnap: any) => {
                        const notesData = notesSnap.data();
                        return getDoc(doc(database, "feedback", trackId))
                            .then((feedbackSnap : any) => {
                                const feedbackData = feedbackSnap.data();
                                const imageRef = ref(storage, trackData.image);
                                return getDownloadURL(imageRef)
                                    .then((downloadURL : string) => {
                                        return Promise.resolve({
                                            title: trackData.title,
                                            image: downloadURL,
                                            description: trackData.description,
                                            username: trackData.username,
                                            userId: trackData.userId,
                                            date: trackData.date,
                                            likes: Object.keys(feedbackData.likes),
                                            comments: Object.values(feedbackData.comments),
                                            notes: notesData.notes
                                        })
                                    })
                            })
                    })
            })
}

export default getNotesData