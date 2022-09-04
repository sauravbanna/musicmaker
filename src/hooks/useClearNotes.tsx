import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useAppDispatch} from '../redux/reduxHooks'
import {makeDefaultState, importAction} from "../views/MusicMakerView/redux/notesReducer"

const useClearNotes = () => {
    const [prevLocation, setPrevLocation] = useState<string>("");
    const location = useLocation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!checkUploadCreateLink()) {
            dispatch(importAction(makeDefaultState()));
        }

        setPrevLocation(location.pathname);
    }, [location])

    const checkUploadCreateLink = () => {
        return ((prevLocation.includes("create")) && (location.pathname.includes("upload")))
                || ((prevLocation.includes("upload")) && (location.pathname.includes("create")))
    }
}

export default useClearNotes