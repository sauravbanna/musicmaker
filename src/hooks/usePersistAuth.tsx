import {useAppSelector, useAppDispatch} from "../redux/reduxHooks"
import {logInUserId, logInUsername} from "../redux/LoginReducer"
import getUsername from "../backend/GetUsername"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {useEffect} from 'react'

const usePersistAuth = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state : any) => state.login.userId);

    useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user : any) => {
        if (user) {
            dispatch(logInUserId(user.uid));
        } else {
            dispatch(logInUserId("none"));
        }
    })

    }, [])

    useEffect(() => {
        updateUsername();
    }, [userId])

    const updateUsername = async () => {
    if (userId != "none" && userId) {
        const newUsername = await getUsername(userId);
        dispatch(logInUsername(newUsername));
    }
    }
}

export default usePersistAuth