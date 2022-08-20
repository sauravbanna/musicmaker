import ILoginRegisterProps from "./LoginRegisterInterface"
import styles from "./LoginRegisterStyles"
import {getErrorMessage} from "../../../../utils/functions"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import InputField from "../../../../components/InputField/InputField"
import AppDivider from "../../../../components/AppDivider/AppDivider"
import SubmitButton from "../../../../components/SubmitButton/SubmitButton"
import {useAppDispatch} from "../../../../redux/reduxHooks"
import {logIn} from "../../redux/LoginReducer"
import {FADE_IN, ELASTIC_EASE} from "../../../../utils/constants"
import {useEffect, useRef, useState} from 'react'
import useInputAndError from "../../../../hooks/useInputAndError"
import {gsap} from "gsap"
import {ERROR_MESSAGES, INVALID_EMAIL, EMPTY_USERNAME, EMPTY_PASSWORD, EMPTY_EMAIL} from "../../utils/constants"
import {useNavigate} from 'react-router-dom'

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

    const [username, setUsername, usernameError, setUsernameError] = useInputAndError("");
    const [password, setPassword, passwordError, setPasswordError] = useInputAndError("");
    const [email, setEmail, emailError, setEmailError] = useInputAndError("");

    const title = login ? "Login" : "Register";

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userMessage, setUserMessage] = useState("");

    const validateAndSubmit = async (e: any) => {

        try {
            checkEmptyFields();
            emailValidate(email);
            await onSubmit(email, username, password)
                .then((userId) => {
                    dispatch(logIn(userId, username));
                })

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
                setUserMessage("Error, please try again!");
            }
            return Promise.reject();
        }

        setUserMessage("Redirecting you to home page...");
        return Promise.resolve("/");

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

        if (!(login) && !(/[a-z0-9]+@([a-z0-9]+\.)+[a-z]+/.test(email))) {
            throw INVALID_EMAIL;
        }
    }

    const resetError = () => {
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
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
                                password={true}
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
                    <div
                        style={
                            {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }
                        }
                    >
                        <Typography variant="subtitle1">
                            {userMessage}
                        </Typography>
                        &nbsp;
                        <SubmitButton
                            name={title}
                            onClick={validateAndSubmit}
                            extraStyles={{minWidth: "20%"}}
                         />
                     </div>
                </Grid>
                <Grid item xs={12}>
                    &nbsp;
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginRegisterView