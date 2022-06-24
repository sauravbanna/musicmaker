import {IPlayButtonProps} from "./PlayButtonInterface"
import {styles} from "./PlayButtonStyles"
import {Button} from "@mui/material"
import {useAppDispatch, useAppSelector} from "../../store/reduxHooks"
import {togglePlay} from "./PlayButtonReducer"
import {shallowEqual} from 'react-redux'
import {playSelector} from "./PlayButtonSelectors"

function PlayButton() {
    const dispatch = useAppDispatch();
    const play = useAppSelector(playSelector, shallowEqual)

    const onClick = () => {
        dispatch(togglePlay())
    }

    return (
        <Button style={styles()} onClick={onClick}>{play ? "Pause" : "Play"}</Button>
    );
}

export default PlayButton