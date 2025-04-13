import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import InputAdornment from "@mui/material/InputAdornment"
import Comment from "../Comment/Comment"
import CommentButton from "../CommentButton/CommentButton"
import {ISongCommentsProps} from "./SongPreviewInterface"
import {useAppSelector} from "../../redux/reduxHooks"
import {useState} from 'react'

const SongComments = ({trackId, comments} : ISongCommentsProps) => {
    const currentUser = useAppSelector((state : any) => state.login);

    const [comment, setComment] = useState("");

    const onComment = (e: any) => {
        e.stopPropagation();
        console.log(comment);
    }

    return (
        <div>
            <Stack sx={{maxWidth: "80%", maxHeight: "100vh", paddingLeft: "1em", justifyContent: "center", display: "flex"}}>
                {comments.map((ele) => {
                    return (
                        <Comment trackId={trackId}/>
                    );
                })}
            </Stack>
            {currentUser.username && currentUser.username != 'none'
                ? <TextField
                      onClick={(e: any) => e.stopPropagation()}
                      onChange={(e: any) => setComment(e.target.value)}
                      value={comment}
                      disabled={!currentUser.userId || currentUser.userId == "none"}
                      fullWidth
                      size="small"
                      InputProps={
                          {
                              endAdornment: <InputAdornment position="end">
                                                  <CommentButton trackId={trackId} onClick={onComment}/>
                                              </InputAdornment>
                          }
                      }
                  />
                : undefined
            }
        </div>
    );
}

export default SongComments