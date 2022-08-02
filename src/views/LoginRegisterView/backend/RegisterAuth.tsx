import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {database} from "../../../utils/config"
import {USERNAME_EXISTS, PASSWORD_SHORT_ERROR} from "../utils/constants"
import {doc, setDoc, getDoc, getDocs, query, where, collection} from "firebase/firestore"

const registerUser = async (email: string, username: string, password: string) => {
    let userId = "";

    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                addUserToDb(userCredential.user.uid, username, email);
            })
}

export const validatePassword = (password: string) => {
        if (password.length < 8) {
            return Promise.reject(PASSWORD_SHORT_ERROR);
        } else {
            return Promise.resolve(password);
        }
    }

const addUserToDb = async (id: string, username: string, email: string) => {
    await setDoc(doc(database, "users", id), {
        following: [],
        likedTracks: [],
        tracks: [],
        username: username,
        email: email
    })

    await setDoc(doc(database, "followers", id), {
        followers: []
    })
}

// NEXT: cloud function for followers doc

export const checkAllUsernames = (username: string) => {
    let uniqueUsername : boolean = false;

    const usersQuery = query(collection(database, "users"), where("username", "==", username));

     return getDocs(usersQuery);
}

export const checkUniqueUsername = async (username: string) => {
    const usersQuerySnap = await checkAllUsernames(username);

    if (!usersQuerySnap.empty) {
        return Promise.reject(USERNAME_EXISTS);
    } else {
        return Promise.resolve(username);
    }
}

export default registerUser