import {getAuth, signOut} from 'firebase/auth'

const logOutAuth = () => {
    const auth = getAuth();

    return signOut(auth);
}

export default logOutAuth