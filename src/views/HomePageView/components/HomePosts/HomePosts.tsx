import PostList from "../../../../components/PostList/PostList"
import useGetTracks from "../../../../hooks/useGetTracks"
import {useEffect} from 'react'

interface IHomePostsProps {
    homeTracks: Array<string>
}

const HomePosts = ({homeTracks} : IHomePostsProps) => {
    const homeTracksData = useGetTracks(homeTracks);

    return (
        <PostList name="" posts={homeTracksData} justify="flex-start" fullWidth={true}/>
    );
}

export default HomePosts