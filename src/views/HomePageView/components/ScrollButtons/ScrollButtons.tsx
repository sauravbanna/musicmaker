import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {APP_COLOR, BUTTON_HOVER, SHADOW} from "../../../../utils/constants"

interface IScrollButtonProps {
    left : boolean,
    onClick: () => void,
    active: boolean
}

const ScrollButton = ({left, onClick, active} : IScrollButtonProps) => {
    const leftOrRightStyle = left ? {left: "0%"} : {right: "0%"}

    return (
        <div
            style={
                {
                    ...leftOrRightStyle,
                    position: "absolute",
                    backgroundColor: APP_COLOR,
                    border: "0.15em solid " + BUTTON_HOVER,
                    borderRadius: "0.5em",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5em",
                    boxShadow: SHADOW,
                    display: active ? "flex" : "none"
                }
            }
            onClick={onClick}
        >
            {left ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </div>
    );
}

interface IScrollButtonsProps {
    visible: boolean,
    onClickLeft: () => void,
    onClickRight: () => void,
    leftButtonActive: boolean,
    rightButtonActive: boolean
}

const ScrollButtons = ({visible, onClickRight, onClickLeft, leftButtonActive, rightButtonActive} : IScrollButtonsProps) => {
    return (
        <div
            style={
                {
                    minWidth: "100%",
                    maxWidth: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    zIndex: 9999,
                    display: visible ? "initial" : "none"
                }
            }
        >
            <ScrollButton left={true} onClick={onClickLeft} active={leftButtonActive}/>
            <ScrollButton left={false} onClick={onClickRight} active={rightButtonActive}/>
        </div>
    );
}

export default ScrollButtons