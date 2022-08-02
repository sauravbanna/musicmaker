import ILoginRegisterProps from "./LoginRegisterInterface"
import styles from "./LoginRegisterStyles"
import {getErrorMessage} from "../../../../utils/functions"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import InputField from "../InputField/InputField"
import AppDivider from "../../../../components/AppDivider/AppDivider"
import AppButton from "../../../../components/AppButton/AppButton"
import {FADE_IN, ELASTIC_EASE} from "../../../../utils/constants"
import {useEffect, useRef, useState} from 'react'
import {gsap} from "gsap"
import {ERROR_MESSAGES, INVALID_EMAIL, EMPTY_USERNAME, EMPTY_PASSWORD, EMPTY_EMAIL} from "../../utils/constants"

const LoginRegisterView = ({login, usernameFail, passwordFail, onSubmit} : ILoginRegisterProps) => {
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

    // NEXT: refactor into hooks

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const title = login ? "Login" : "Register";

    const validateAndSubmit = async (e: any) => {
        // NEXT:  input disable register button when clicked
        // NEXT: register button loading icon when clicked
        e.stopPropagation();

        setLoading(true);

        try {
            checkEmptyFields();
            emailValidate(email);
            await onSubmit(email, username, password);
            const linkToHome = document.createElement('a');
            linkToHome.href = "/home"
            linkToHome.click();
        } catch (error : any) {
            console.log(error);
            const errorMsg : string = getErrorMessage(error);
            console.log(errorMsg);
            if (errorMsg.toLowerCase().includes("email")) {
                setEmailError(ERROR_MESSAGES[errorMsg]);
            } else if (errorMsg.toLowerCase().includes("username")) {
                setUsernameError(ERROR_MESSAGES[errorMsg]);
            } else if (errorMsg.toLowerCase().includes("password")) {
                setPasswordError(ERROR_MESSAGES[errorMsg]);
            } else {

            }
        }

        setLoading(false);
    }

    const checkEmptyFields = () => {
        if (!login && email.length == 0) {
            throw EMPTY_EMAIL
        }
        if (username.length == 0) {
            throw EMPTY_USERNAME
        }
        if (password.length == 0) {
            throw EMPTY_PASSWORD
        }
    }

    const emailValidate = (email: string) => {
        // NEXT : implement email validate if exists or nah

        if (!(login) && !(/[a-z0-9]+@([a-z0-9]+\.)+[a-z]+/.test(email))) {
            throw INVALID_EMAIL;
        }
    }

    const resetError = () => {
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        setLoading(false);
    }

    return (
        <div
            style={styles().mainDiv}
        >
            <Grid
                ref={pageDiv}
                container
                sx={styles().centerDiv}
                onClick={resetError}
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
                                <InputField
                                    name="Email"
                                    errorStatus={emailError.length !== 0}
                                    textValue={email}
                                    onChange={(e : any) => setEmail(e.target.value)}
                                    errorString={emailError}
                                    fullWidth={true}
                                />
                        }
                            <InputField
                                name="Username"
                                errorStatus={usernameError.length !== 0}
                                textValue={username}
                                onChange={(e : any) => setUsername(e.target.value)}
                                errorString={usernameError}
                                fullWidth={false}
                            />
                            <InputField
                                name="Password"
                                errorStatus={passwordError.length !== 0}
                                textValue={password}
                                onChange={(e : any) => setPassword(e.target.value)}
                                errorString={passwordError}
                                fullWidth={false}
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
                        disable={loading}
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