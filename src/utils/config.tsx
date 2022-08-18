import {initializeApp} from 'firebase/app'
import {getFirestore, collection} from '@firebase/firestore'
import {getStorage} from "@firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDiG38-5xACg64ehfcCWC0dqPQvfo3LvlE",
    authDomain: "musicmaker-9c83c.firebaseapp.com",
    projectId: "musicmaker-9c83c",
    storageBucket: "musicmaker-9c83c.appspot.com",
    messagingSenderId: "326264310556",
    appId: "1:326264310556:web:5eb3b084e7d01258a488d9",
    measurementId: "G-LMDM5FZK60"
}

const app =  initializeApp(firebaseConfig);

export const database = getFirestore(app);

export const storage = getStorage(app);
