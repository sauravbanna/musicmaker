import {doc, getDoc} from "firebase/firestore"
import {database} from "../utils/config"

const getUsername = (userId: string) => {
    return getDoc(doc(database, "users", userId))
            .then((docSnap : any) => {
                return Promise.resolve(docSnap.data().username);
            })
}

export default getUsername