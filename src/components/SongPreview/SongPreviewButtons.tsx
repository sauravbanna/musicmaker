import AppDivider from "../AppDivider/AppDivider"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CommentIcon from '@mui/icons-material/Comment'
import CommentIconOutlined from '@mui/icons-material/CommentOutlined'
import AppIconButton from "../AppIconButton/AppIconButton"
import LikeButton from "../LikeButton/LikeButton"
import {ISongPreviewButtonsProps} from "./SongPreviewInterface"



const SongPreviewButtons = ({id, likes, comments, expanded, setExpand} : ISongPreviewButtonsProps) => {

    const onClick = () => {
        setExpand((prev : boolean) => !prev);
    }

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
        >
            <LikeButton id={id}/>
            <Typography variant="subtitle2" >
                {likes}
            </Typography>
            <AppDivider orientation="vertical" />
            <AppIconButton
                icon={<CommentIcon sx={{color: "black"}}/>}
                clickIcon={<CommentIcon sx={{color: "white"}}/>}
                onClick={onClick}
                clicked={expanded}
            />
            <Typography variant="subtitle2" >
                {comments}
            </Typography>
        </Stack>
    );
}

export default SongPreviewButtons