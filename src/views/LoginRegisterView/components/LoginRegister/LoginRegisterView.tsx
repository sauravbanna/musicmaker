import ILoginRegisterProps from "./LoginRegisterInterface"
import styles, {StyledTextField} from "./LoginRegisterStyles"
import Grid from "@mui/material/Grid"
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

    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const title = login ? "Login" : "Register";

    const validateAndSubmit = (e: any) => {
        e.stopPropagation();
        if (usernameValidate(username)) {
            setUsernameError(false);
            if (passwordValidate(username, password)) {
                setPasswordError(false);
                onSubmit(username, password);
            } else {
                setPasswordError(true);
                return
            }
        } else {
            setUsernameError(true);
            return
        }
    }

    const resetError = () => {
        setUsernameError(false);
        setPasswordError(false);
    }

    return (
        <div
            style={styles().mainDiv}
            onClick={resetError}
        >
            <Grid
                ref={pageDiv}
                container
                sx={styles().centerDiv}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Grid
                        container
                        spacing={15}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{paddingLeft: "0.8em"}}
                                    >
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <AppDivider orientation="horizontal" animate={{center: true, delay: 0}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Grid
                                container
                                direction="column"
                                spacing={8}
                                sx={{alignItems: "flex-end", display: "flex", paddingRight: "3em", backgroundColor: "none"}}

                            >
                                <Grid
                                    item
                                >
                                    <StyledTextField
                                        InputLabelProps={{shrink: false}}
                                        error={usernameError}
                                        variant="outlined"
                                        helperText={usernameError ? usernameFail : ""}
                                        label= {username === "" ? "Username" : ""}
                                        color="success"
                                        onChange={(e : any) => setUsername(e.target.value)}
                                    />
                                </Grid>
                                <Grid
                                    item
                                >
                                    <StyledTextField
                                        InputLabelProps={{shrink: false}}
                                        error={passwordError}
                                        variant="outlined"
                                        helperText={passwordError ? passwordFail : ""}
                                        label= {password === "" ? "Password" : ""}
                                        color="success"
                                        onChange={(e : any) => setPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{justifyContent: "center", display: "flex"}}
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
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginRegisterView