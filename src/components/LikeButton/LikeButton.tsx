import AppIconButton from "../AppIconButton/AppIconButton"
import FavoriteBorderIcon from '@mui/icons-material/Favorite'
import ILikeButtonProps from "./LikeButtonInterface"
import {useState} from 'react'

const LikeButton = ({id}: ILikeButtonProps) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const onClick = () => {
        setClicked((prev: boolean) => !prev);
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