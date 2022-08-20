import {getAuth} from "firebase/auth"
import {database} from "../../../utils/config"
import {doc, setDoc, getDocs, query, where, collection} from "firebase/firestore"

// get user's following artists
// get user's liked tracks
// for each followed artist
// get their tracks list
// following, likes, tracks

interface IUserData {
    following: Array<string>,
    likedTracks: Array<string>
}

interface IUserHomeData extends IUserData {
    homeTracks: Array<string>
}

const getUserHome = () => {
    const auth = getAuth();

    if (auth.currentUser != null) {
        return getUserData()
                .then(() => {
                    console.log("ok");
                })
    } else {
        return Promise.reject('not-logged-in');
    }
}

const getUserData = () => {
    return Promise.resolve();
}