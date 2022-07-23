import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {database} from "../../../utils/config"
import {doc, setDoc, getDoc} from "firebase/firestore"

const registerUser = (email: string, username: string, password: string) => {
    let userId = "";

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            userId = user.uid;
            addUserToDb(userId, username);
            return true;
        })
        .catch((error) => {
            console.log(error.code + " " + error.message);
            return false;
        });
}

const addUserToDb = async (id: string, username: string) => {
    await setDoc(doc(database, id, username), {
        followerCount: 0,
        followers: [],
        following: [],
        followingCount: 0,
        likedTracks: [],
        tracks: [],
        id: id,
        username: username
    })
}

export const checkUniqueUsername = (username: string) : boolean => {
    var userDocRef = doc(database, "users", username);

    var existsCheck : boolean = false;

    getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
            existsCheck = true;
        } else {
            existsCheck = false;
        }
    });

    return !existsCheck;
}

export default registerUser