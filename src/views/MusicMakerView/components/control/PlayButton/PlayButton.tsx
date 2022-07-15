import {IPlayButtonProps} from "./PlayButtonInterface"
import {Button} from "@mui/material"
import {useAppDispatch, useAppSelector} from "../../../../../redux/reduxHooks"
import {togglePlay} from "../../../redux/PlayButtonReducer"
import {shallowEqual} from 'react-redux'
import {playSelector} from "../../../utils/MusicMakerSelectors"
import AppButton from "../../../../../components/AppButton/AppButton"

function PlayButton() {
    const dispatch = useAppDispatch();
    const play = useAppSelector(playSelector, shallowEqual);
    const every = useAppSelector((state) => (state));

    const onClick = () => {
        console.log(every);
        dispatch(togglePlay())
    }

    return (
        <AppButton name={play ? "Pause" : "Play"} onClick={onClick} />
    );
}

export default PlayButton