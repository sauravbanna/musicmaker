import PostList from "../../../../components/PostList/PostList"
import getHomeTracks, {ITrackDataWithFeedback} from "../../backend/GetHomeTracks"
import {useState, useEffect} from "react"

interface IHomePostsProps {
    homeTracks: Array<string>
}

const HomePosts = ({homeTracks} : IHomePostsProps) => {
    const [homeTracksData, setHomeTracksData] = useState<Array<ITrackDataWithFeedback>>([]);

    useEffect(() => {
        getHomeTracksData();
    }, [homeTracks])

    const getHomeTracksData = async () => {
        try {
            setHomeTracksData(await getHomeTracks(homeTracks));
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <PostList name="" posts={homeTracksData} justify="flex-start" fullWidth={true}/>
    );
}

export default HomePosts