import IProfilePostsProps from "./ProfilePostsInterface"
import getTracks, {ITrackDataWithFeedback} from "../../../../backend/GetTracks"
import SongPreview from "../../../../components/SongPreview/SongPreview"
import PostList from "../../../../components/PostList/PostList"
import Typography from "@mui/material/Typography"
import {PROFILE_POSTS_WIDTH} from "../../utils/constants"
import {useEffect, useState} from 'react'

function ProfilePosts({tracks} : IProfilePostsProps) {
    const [profileTracks, setProfileTracks] = useState<Array<ITrackDataWithFeedback>>([]);

    useEffect(() => {
        getProfileTracks();
    }, [tracks])

    const getProfileTracks = async () => {
        try {
            setProfileTracks(await getTracks(tracks));
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <PostList name={"User Tracks"} posts={profileTracks} justify="center" fullWidth={false}/>
    );
}

export default ProfilePosts