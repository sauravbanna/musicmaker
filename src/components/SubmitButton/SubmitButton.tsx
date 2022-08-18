import AppButton from "../AppButton/AppButton"
import ISubmitButtonProps from "./SubmitButtonInterface"
import {useNavigate} from 'react-router-dom'
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import {useState} from 'react'

const SubmitButton = ({name, onClick, children, extraStyles, disableRipple, disableHover} : ISubmitButtonProps) => {
    const [buttonState, setButtonState] = useState<string>("active");

    const navigate = useNavigate();

    const loadOnClick = async (e: any) => {
        e.stopPropagation();
        setButtonState("loading");
        //onClick(e);
        try {
            const navNext = await onClick(e);
            setButtonState("done");
            setTimeout(() => navigate(navNext, {replace: true}), 4000);
        } catch (e: any) {
            setButtonState("error");
            setTimeout(() => setButtonState("active"), 3000);
        }


    }

    return (
        <AppButton
            name={buttonState === "active" ? name : ""}
            onClick={loadOnClick}
            extraStyles={extraStyles}
        >
            {buttonState === "loading" ? <PendingIcon />
                : buttonState === "done" ? <CheckIcon />
                : buttonState === "error" ? <ErrorIcon />
                : null}
            {children}
        </AppButton>
    );
}

export default SubmitButton