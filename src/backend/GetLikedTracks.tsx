import {getAuth} from "firebase/auth"
import {database} from "../utils/config"
import {doc, getDoc} from "firebase/firestore"

const getLikedTracks = () : Promise<Array<string>> => {
    const auth = getAuth();

    if (auth.currentUser != null) {
        return getDoc(doc(database, "users", auth.currentUser.uid))
            .then((userSnap: any) => {
                return Promise.resolve(Object.keys(userSnap.data().likedTracks));
            })
    } else {
        return Promise.resolve([]);
    }
}

export default getLikedTracks;
