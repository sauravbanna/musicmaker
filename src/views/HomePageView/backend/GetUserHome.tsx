import {getAuth} from "firebase/auth"
import {database} from "../../../utils/config"
import {doc, getDoc} from "firebase/firestore"
import {DEFAULT_HOME_DATA} from "../utils/constants"


interface IUserData {
    following: Array<string>,
    likedTracks: Array<string>
}

export interface IUserHomeData extends IUserData {
    homeTracks: Array<string>
}

const getUserHome = () : Promise<any> => {
    const auth = getAuth();
    if (auth.currentUser != null) {
        return getUserData(auth.currentUser.uid)
                .then((userData : IUserData) => {
                    return getHomeTracks(userData.following)
                        .then((allHomeTracks : Array<string>) => {
                            return Promise.resolve({
                               ...userData,
                               homeTracks: allHomeTracks
                           })
                        })
                })
    } else {
        return Promise.reject('not-logged-in');
    }
}

const getUserData = (userId: string) : Promise<IUserData> => {
    return getDoc(doc(database, "users", userId))
            .then((userSnap : any) => {
                return {
                    following: Object.keys(userSnap.data().following),
                    likedTracks: Object.keys(userSnap.data().likedTracks)
                }
            })
}

const getHomeTracks = (following: Array<string>) : Promise<Array<string>> => {
    return following.reduce((prevPromise: Promise<any>, nextId: string) => {
        return prevPromise.then((userTracks: Array<string>) => {
            return getDoc(doc(database, "users", nextId))
                    .then((userSnap: any) => {
                        return Promise.resolve(userTracks.concat(Object.keys(userSnap.data().tracks)));
                    })
        })
    }, Promise.resolve([]))


}

export default getUserHome