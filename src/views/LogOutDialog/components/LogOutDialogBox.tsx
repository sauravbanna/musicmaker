import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CloseIcon from '@mui/icons-material/Close';
import AppButton from "../../../components/AppButton/AppButton"
import AppIconButton from "../../../components/AppIconButton/AppIconButton"
import {APP_COLOR, SHADOW, FADE_IN, ELASTIC_EASE} from "../../../utils/constants"
import ILogOutDialogProps from "../view/LogOutDialogInterface"
import {useAppDispatch} from "../../../redux/reduxHooks"
import {logIn} from "../../LoginRegisterView/redux/LoginReducer"
import {useState, useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {useNavigate} from 'react-router-dom'
import logOutAuth from '../backend/LogOutAuth'

const LogOutDialogBox = ({prevLink} : ILogOutDialogProps) => {
    const dialogRef = useRef<any>();
    const timeline = useRef<any>();

    useEffect(() => {
        timeline.current = gsap
                            .timeline({repeat: 0})
                            .fromTo(
                                dialogRef.current,
                                {maxWidth: "0%", maxHeight: "0%"},
                                {
                                    maxWidth: "100%",
                                    maxHeight: "0%",
                                    repeat: 0,
                                    duration: FADE_IN,
                                    ease: "power3.out"
                                }
                            )
    }, []);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const dialogClose = () => {
        navigate(prevLink, {replace: true});
    }

    const logOut = async (e : any) => {
        try {
            await logOutAuth();
            dispatch(logIn(""));
            navigate("/", {replace: true});
        } catch (err : any) {

        }

    }

    const [close, setClose] = useState<boolean>(false);

    return (
        <Paper
            ref={dialogRef}
            sx=
                {
                    {
                        padding: "2em",
                        paddingTop: "0.5em",
                        paddingRight: "1em",
                        paddingLeft: "1em",
                        borderRadius: "0.5em",
                        backgroundColor: APP_COLOR,
                    }
                }
        >
            <Grid
                container
                spacing={4}
                sx=
                    {
                        {
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center"
                        }
                    }
            >
                <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                    <AppIconButton
                        onClick={dialogClose}
                        icon={<CloseIcon sx={{color: "black"}}/>}
                        clicked={close}
                        clickIcon={<CloseIcon sx={{color: "white"}} />}
                        onMouseDown={() => setClose(true)}
                        onMouseUp={() => setClose(false)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        {"Are you sure you want to log out?"}
                    </Typography>
                </Grid>
                <Grid item>
                    <AppButton name="Log Out" onClick={logOut} />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default LogOutDialogBox