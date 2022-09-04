import {Timestamp} from "firebase/firestore"

export default interface ITrackInfoProps {
    title: string,
    image: string,
    description: string,
    username: string,
    date: Timestamp,
    likes: Array<string>,
    id: string
}