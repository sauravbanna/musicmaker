import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import DialogBox from "../../../components/DialogBox/DialogBox"
import ILogOutDialogProps from "./LogOutDialogInterface"
import DialogBackground from "../../../components/DialogBackground/DialogBackground"
import logOutAuth from '../backend/LogOutAuth'
import {logIn} from "../../LoginRegisterView/redux/LoginReducer"
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from "../../../redux/reduxHooks"

const LogOutDialog = ({prevLink} : ILogOutDialogProps) => {
    const dispatch = useAppDispatch();

    const logOut = async (e : any) => {
        try {
            await logOutAuth();
            dispatch(logIn("", ""));
        } catch (err : any) {

        }

    }

    return (
        <DialogBackground>
            <DialogBox
                buttonName="Log Out"
                onClick={logOut}
                prevLink={prevLink}
                nextLink="/"
            >
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        {"Are you sure you want to log out?"}
                    </Typography>
                </Grid>
            </DialogBox>
        </DialogBackground>
    );
}

export default LogOutDialog