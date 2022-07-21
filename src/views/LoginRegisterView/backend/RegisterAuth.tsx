import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {database} from "../../../utils/config"
import {doc, setDoc, collection} from "firebase/firestore"

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
    await setDoc(doc(database, "users", username), {
        followerCount: 0,
        followers: [],
        following: [],
        followingCount: 0,
        likedTracks: [],
        tracks: [],
        id: id
    })
}

export const checkUniqueUsername = (username: string) => {
    var userDocRef = database.collection("users").doc(username);

    userDocRef.get().then((doc) => {
        return doc.exists;
    });
}

export default RegisterUser