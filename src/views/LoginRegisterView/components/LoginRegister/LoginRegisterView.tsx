import ILoginRegisterProps from "./LoginRegisterInterface"
import styles, {StyledTextField} from "./LoginRegisterStyles"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import AppDivider from "../../../../components/AppDivider/AppDivider"
import AppButton from "../../../../components/AppButton/AppButton"
import {FADE_IN, ELASTIC_EASE} from "../../../../utils/constants"
import {useEffect, useRef, useState} from 'react'
import {gsap} from "gsap"

const LoginRegisterView = ({login, usernameFail, passwordFail, usernameValidate, passwordValidate, onSubmit} : ILoginRegisterProps) => {
    const pageDiv = useRef<any>();
    const timeline = useRef<any>();

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0})
                                .fromTo(
                                    pageDiv.current,
                                    {maxWidth: "25%"},
                                    {
                                        maxWidth: styles().centerDiv.maxWidth,
                                        duration: FADE_IN,
                                        repeat: 0,
                                        ease: ELASTIC_EASE
                                    }
                                )
    }, [])

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);

    const title = login ? "Login" : "Register";

    const validateAndSubmit = (e: any) => {
        e.stopPropagation();

        if (username.length == 0 || password.length == 0) {
            return
        }

        if (login || emailValidate(email)) {
            if (usernameValidate(username)) {
                setUsernameError(false);
                if (passwordValidate(username, password)) {
                    setPasswordError(false);
                    onSubmit(email, username, password);
                } else {
                    setPasswordError(true);
                    return
                }
            } else {
                setUsernameError(true);
                return
            }
        } else {
            setEmailError(true);
            return
        }

    }

    const emailValidate = (email: string) => {
        return /[a-z0-9]+@([a-z0-9]+\.)+[a-z]+/.test(email);
    }

    const resetError = () => {
        setUsernameError(false);
        setPasswordError(false);
    }

    return (
        <div
            style={styles().mainDiv}
        >
            <Grid
                ref={pageDiv}
                container
                sx={styles().centerDiv}
                spacing={0}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Stack
                        spacing={2}
                    >
                        <Typography
                            variant="h3"
                            sx={{paddingLeft: "0.8em"}}
                        >
                            {title}
                        </Typography>
                        <AppDivider orientation="horizontal" animate={{center: true, delay: 0}}/>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Stack
                        spacing={6}
                        alignItems="flex-end"
                    >
                        {
                            login ? null :
                                <StyledTextField
                                    InputLabelProps={{shrink: false}}
                                    error={emailError}
                                    variant="outlined"
                                    helperText={emailError ? "Please enter a valid email" : ""}
                                    label= {email === "" ? "Email" : ""}
                                    color="success"
                                    fullWidth
                                    onChange={(e : any) => setEmail(e.target.value)}
                                />
                        }
                            <StyledTextField
                                InputLabelProps={{shrink: false}}
                                error={usernameError}
                                variant="outlined"
                                helperText={usernameError ? usernameFail : ""}
                                label= {username === "" ? "Username" : ""}
                                color="success"
                                onChange={(e : any) => setUsername(e.target.value)}
                            />
                            <StyledTextField
                                InputLabelProps={{shrink: false}}
                                error={passwordError}
                                variant="outlined"
                                helperText={passwordError ? passwordFail : ""}
                                label= {password === "" ? "Password" : ""}
                                color="success"
                                onChange={(e : any) => setPassword(e.target.value)}
                            />
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{justifyContent: "center", display: "flex", alignItems: "center"}}
                >
                    <AppButton
                        name={title}
                        onClick={validateAndSubmit}
                        extraStyle={{minWidth: "20%"}}
                     />
                </Grid>
                <Grid item xs={12}>
                    &nbsp;
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginRegisterView