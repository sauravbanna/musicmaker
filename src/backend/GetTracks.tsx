import {doc, getDoc} from "firebase/firestore"
import {database, storage} from "../utils/config"
import {ref, getDownloadURL} from "firebase/storage"

export interface ITrackData {
    trackId: string,
    title: string,
    image: string,
    name: string,
    date: any,
    id: string,
    description: string
}

interface IFeedbackData {
    likes: Array<string>,
    comments: Array<any>
}

export interface ITrackDataWithFeedback extends ITrackData, IFeedbackData {
}

const getTracks = (homeTracks : Array<string>) : Promise<Array<ITrackDataWithFeedback>> => {
    return homeTracks.reduce((prevPromise: Promise<any>, trackId) => {
        return prevPromise.then((homeTracksArray: Array<ITrackDataWithFeedback>) => {
            return getTrack(trackId)
                    .then((trackData : ITrackData) => {
                        return getTrackFeedback(trackId)
                                .then((feedbackData: IFeedbackData) => {
                                    homeTracksArray.push({
                                                             ...trackData,
                                                             ...feedbackData
                                                         })
                                    return Promise.resolve(homeTracksArray);
                                })
                    })
        })
    }, Promise.resolve([]))
}

const getTrack = (id: string) : Promise<ITrackData> => {
    return getDoc(doc(database, "tracks", id.trim()))
            .then((docSnap : any) => {
                const data = docSnap.data();

                const imageRef = ref(storage, data.image);

                return getDownloadURL(imageRef)
                        .then((downloadURL: string) => {
                            return Promise.resolve({
                                trackId: id,
                                title: data.title,
                                image: downloadURL,
                                name: data.username,
                                date: data.date,
                                id: data.userId,
                                description: data.description
                            })
                        })


            })
}

const getTrackFeedback = (id: string) : Promise<IFeedbackData> => {
    return getDoc(doc(database, "feedback", id.trim()))
            .then((docSnap: any) => {
                const data = docSnap.data();

                return Promise.resolve({
                    likes: Object.keys(data.likes),
                    comments: Object.values(data.comments)
                })
            })
}

export default getTracks

