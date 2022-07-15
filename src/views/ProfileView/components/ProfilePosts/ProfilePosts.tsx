import SongPreview from "../../../../components/SongPreview/SongPreview"
import PostList from "../../../../components/PostList/PostList"
import Typography from "@mui/material/Typography"
import {PROFILE_POSTS_WIDTH} from "../../utils/constants"

function ProfilePosts() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return (
        <PostList name={"User Tracks"} posts={array} justify="center" fullWidth={false}/>
    );
}

export default ProfilePosts