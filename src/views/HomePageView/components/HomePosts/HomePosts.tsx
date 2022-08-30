import PostList from "../../../../components/PostList/PostList"
import getTracks, {ITrackDataWithFeedback} from "../../../../backend/GetTracks"
import {useState, useEffect} from "react"

interface IHomePostsProps {
    homeTracks: Array<string>
}

const HomePosts = ({homeTracks} : IHomePostsProps) => {
    const [homeTracksData, setHomeTracksData] = useState<Array<ITrackDataWithFeedback>>([]);

    useEffect(() => {
        getHomeTracks();
    }, [homeTracks])

    const getHomeTracks = async () => {
        try {
            setHomeTracksData(await getTracks(homeTracks));
        } catch (e: any) {
            console.log(e);
        }
    }

    console.log(homeTracksData)

    return (
        <PostList name="" posts={homeTracksData} justify="flex-start" fullWidth={true}/>
    );
}

export default HomePosts