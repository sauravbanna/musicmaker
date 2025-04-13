import getLikedTracks from "../backend/GetLikedTracks"
import {useAppSelector} from "../redux/reduxHooks"
import {useState, useEffect} from 'react'

const useGetLikedTracks = () => {
    const currentUser = useAppSelector((state : any) => state.login)

    const [likedTracks, setLikedTracks] = useState<Array<string>>([]);

    useEffect(() => {
        getUserLikedTracks();
    }, [currentUser])

    const getUserLikedTracks = async () => {
        try {
            setLikedTracks(await getLikedTracks());
        } catch (e: any) {
            console.log(e)
        }
    }

    return likedTracks;
}

export default useGetLikedTracks