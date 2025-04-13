import AppIconButton from "../AppIconButton/AppIconButton"
import FavoriteBorderIcon from '@mui/icons-material/Favorite'
import PendingIcon from '@mui/icons-material/Pending';
import ILikeButtonProps from "./LikeButtonInterface"
import {like, unLike} from "../../backend/SendLike"
import {useState, useEffect} from 'react'

const LikeButton = ({trackId, liked}: ILikeButtonProps) => {
    const [clicked, setClicked] = useState<boolean>(liked);

    useEffect(() => {
        console.log(liked);
        setClicked(liked);
    }, [liked])

    const onClick = async (e: any) => {
        e.stopPropagation();

        try {
            if (!clicked) {
                await like(trackId, true);
            } else {
                await unLike(trackId, true);
            }
            setClicked((prev: boolean) => !prev);
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <AppIconButton
            icon={<FavoriteBorderIcon sx={{color: "black"}}/>}
            clickIcon={<FavoriteBorderIcon sx={{color: "white"}}/>}
            onClick={onClick}
            clicked={clicked}
         />
    );
}

export default LikeButton