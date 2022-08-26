import {doc, getDoc} from "firebase/firestore"
import {database, storage} from "../../../utils/config"
import {ref, getDownloadURL} from "firebase/storage"

export interface ITrackData {
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

const getHomeTracks = (homeTracks : Array<string>) : Promise<Array<ITrackDataWithFeedback>> => {
    return homeTracks.reduce((prevPromise: Promise<any>, trackId) => {
        return prevPromise.then((homeTracksArray: Array<ITrackDataWithFeedback>) => {
            return getHomeTrack(trackId)
                    .then((trackData : ITrackData) => {
                        return getTrackFeedback(trackId)
                                .then((feedbackData: IFeedbackData) => {
                                    return Promise.resolve({
                                        ...trackData,
                                        ...feedbackData
                                    })
                                })
                    })
        })
    }, Promise.resolve([]))
}

const getHomeTrack = (id: string) : Promise<ITrackData> => {
    console.log(id);
    return getDoc(doc(database, "tracks", id))
            .then((docSnap : any) => {
                const data = docSnap.data();

                return Promise.resolve({
                    title: data.title,
                    image: data.image,
                    name: data.username,
                    date: data.date,
                    id: data.userId,
                    description: data.description
                })
            })
}

const getTrackFeedback = (id: string) : Promise<IFeedbackData> => {
    return getDoc(doc(database, "feedback", id))
            .then((docSnap: any) => {
                const data = docSnap.data();

                return Promise.resolve({
                    likes: Object.keys(data.likes),
                    comments: Object.keys(data.comments)
                })
            })
}

export default getHomeTracks

