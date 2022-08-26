import {getAuth} from "firebase/auth"
import {database} from "../../../utils/config"
import {doc, setDoc, getDocs, getDoc, query, where, collection, FieldPath} from "firebase/firestore"

// get user's following artists
// get user's liked tracks
// for each followed artist
// get their tracks list
// following, likes, tracks

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
                            console.log(allHomeTracks);
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