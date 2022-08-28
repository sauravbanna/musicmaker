import {doc, getDoc} from "firebase/firestore"
import {database, storage} from "../../../utils/config"
import {ref, getDownloadURL} from "firebase/storage"

interface IProfileData {
    username: string,
    about: string,
    tracks: Array<string>,
    tracksCount: number,
    followingCount: number,
    following: Array<string>,
    likedTracks: Array<string>,
    likedTracksCount: number
}

interface IProfileMetrics {
    followersCount: number,
    followers: Array<string>
}

export interface IProfileDataWithMetrics extends IProfileData, IProfileMetrics {

}

const getProfileData = (uid: string) : Promise<IProfileDataWithMetrics> => {
    return getProfileDataFromDoc(uid)
            .then((profileData : IProfileData) => {
                return getProfileMetrics(uid)
                        .then((profileMetrics: IProfileMetrics) => {
                            return Promise.resolve({
                                ...profileData,
                                ...profileMetrics
                            })
                        })
            })
}

const getProfileDataFromDoc = (uid : string) => {
    return getDoc(doc(database, "users", uid))
            .then((docSnap : any) => {
                const data = docSnap.data();

                const tracks = Object.keys(data.tracks);
                const following = Object.keys(data.following);
                const likedTracks = Object.keys(data.likedTracks);

                return Promise.resolve({
                    username: data.username,
                    about: data.about,
                    tracks,
                    tracksCount: tracks.length,
                    followingCount: following.length,
                    following,
                    likedTracks,
                    likedTracksCount: likedTracks.length
                })
            })
}

const getProfileMetrics = (uid : string) => {
    return getDoc(doc(database, "followers", uid))
            .then((docSnap : any) => {
                const data = docSnap.data();

                const followers = Object.keys(data.followers);

                return Promise.resolve({
                    followers,
                    followersCount: followers.length
                })
            })
}

export default getProfileData