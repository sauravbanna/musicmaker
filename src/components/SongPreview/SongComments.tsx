import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import InputAdornment from "@mui/material/InputAdornment"
import Comment from "../Comment/Comment"
import CommentButton from "../CommentButton/CommentButton"
import {ISongCommentsProps} from "./SongPreviewInterface"

const SongComments = ({id} : ISongCommentsProps) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <div>
            <Stack sx={{maxWidth: "80%", maxHeight: "100vh", paddingLeft: "1em", justifyContent: "center", display: "flex"}}>
                {array.map((ele) => {
                    return (
                        <Comment />
                    );
                })}
            </Stack>
            <TextField
                fullWidth
                size="small"
                InputProps={
                    {
                        endAdornment: <InputAdornment position="end">
                                            <CommentButton id={id} />
                                        </InputAdornment>
                    }
                }
            />
        </div>
    );
}

export default SongComments