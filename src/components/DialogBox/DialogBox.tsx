import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CloseIcon from '@mui/icons-material/Close';
import SubmitButton from "../SubmitButton/SubmitButton"
import AppIconButton from "../AppIconButton/AppIconButton"
import IDialogBoxProps from "./DialogBoxInterface"
import {APP_COLOR, SHADOW, FADE_IN} from "../../utils/constants"
import {useNavigate} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'
import {gsap} from 'gsap'


const DialogBox = ({buttonName, onClick, onBackgroundClick, prevLink, children, style}: IDialogBoxProps) => {
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

    const navigate = useNavigate();

    const dialogClose = () => {
        try {
            navigate(prevLink, {replace: true});
        } catch(err : any) {
            navigate("/", {replace: true});
        }

    }

    const [close, setClose] = useState<boolean>(false);

    return (
        <Paper
            ref={dialogRef}
            onClick={onBackgroundClick}
            sx=
                {
                    {
                        padding: "2em",
                        paddingTop: "0.5em",
                        paddingRight: "1em",
                        paddingLeft: "1em",
                        borderRadius: "0.5em",
                        backgroundColor: APP_COLOR,
                        ...style
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
                {children}
                <Grid
                    item
                    xs={12}
                    sx={
                        {
                            justifyContent: "center",
                            display: "flex"
                        }
                    }
                >
                    <SubmitButton name={buttonName} onClick={onClick}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default DialogBox