import {IPlayButtonProps} from "./PlayButtonInterface"
import {Button} from "@mui/material"
import {useAppDispatch, useAppSelector} from "../../../../../redux/reduxHooks"
import {togglePlay} from "../../../redux/PlayButtonReducer"
import {shallowEqual} from 'react-redux'
import {playSelector} from "../../../utils/MusicMakerSelectors"
import AppButton from "../../../../../components/AppButton/AppButton"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function PlayButton() {
    const dispatch = useAppDispatch();
    const play = useAppSelector(playSelector, shallowEqual);
    const every = useAppSelector((state) => (state));

    const onClick = () => {
        dispatch(togglePlay())
    }

    return (
        <AppButton
            name={play ? "Pause" : "Play"}
            onClick={onClick}
        >
            <PlayArrowIcon />
        </AppButton>
    );
}

export default PlayButton