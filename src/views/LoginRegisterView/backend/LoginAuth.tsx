import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {checkAllUsernames} from "./RegisterAuth"
import {USERNAME_NOT_FOUND} from "../utils/constants"

export const checkUsernameExists = async (username : string) => {
    const usersQuerySnap = await checkAllUsernames(username);

     if (!usersQuerySnap.empty) {
        const userDoc = usersQuerySnap.docs[0];
        return Promise.resolve(userDoc.data().email);
    } else {
        return Promise.reject(USERNAME_NOT_FOUND);
    }
}

export const loginUser = (username: string, password: string) => {

    return checkUsernameExists(username)
        .then((email) => {
            const auth = getAuth();

            return signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user.uid);
                    return Promise.resolve(userCredential.user.uid);
                })
        })
}