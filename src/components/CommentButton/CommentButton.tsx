import ICommentButtonProps from "./CommentButtonInterface"
import AppIconButton from "../AppIconButton/AppIconButton"
import SendIcon from '@mui/icons-material/Send'
import {useState} from 'react'

const CommentButton = ({trackId, onClick} : ICommentButtonProps) => {
    const [pressed, setPressed] = useState<boolean>(false);

    const onMouseDown = () => {
        setPressed(true);
    }

    const onMouseUp = () => {
        setPressed(false);
    }

    return (
        <AppIconButton
            icon={<SendIcon />}
            onClick={onClick}
            clickIcon={<SendIcon sx={{color: "white"}}/>}
            clicked={pressed}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        />
    );
}

export default CommentButton