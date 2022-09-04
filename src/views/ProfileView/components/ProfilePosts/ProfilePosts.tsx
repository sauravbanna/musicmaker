import IProfilePostsProps from "./ProfilePostsInterface"
import useGetTracks from "../../../../hooks/useGetTracks"
import SongPreview from "../../../../components/SongPreview/SongPreview"
import PostList from "../../../../components/PostList/PostList"
import Typography from "@mui/material/Typography"
import {PROFILE_POSTS_WIDTH} from "../../utils/constants"

function ProfilePosts({tracks} : IProfilePostsProps) {
    const profileTracks = useGetTracks(tracks);

    return (
        <PostList name={"User Tracks"} posts={profileTracks} justify="center" fullWidth={false}/>
    );
}

export default ProfilePosts