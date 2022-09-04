import {useEffect, useState} from 'react'
import getTracks, {ITrackDataWithFeedback} from "../backend/GetTracks"

const useGetTracks = (tracks: Array<string>) : Array<ITrackDataWithFeedback> => {
    const [tracksData, setTracksData] = useState<Array<ITrackDataWithFeedback>>([]);

    useEffect(() => {
        getProfileTracks();
    }, [tracks])

    const getProfileTracks = async () => {
        try {
            setTracksData(await getTracks(tracks));
        } catch (e: any) {
            console.log(e);
        }
    }

    return tracksData;
}

export default useGetTracks