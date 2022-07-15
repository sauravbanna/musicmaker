import LoginRegisterView from "../components/LoginRegister/LoginRegisterView"

const RegisterView = () => {
    const validateUsername = (username: string) => {
        return username != "User1"
    }

    const validatePassword = (username: string, password: string) => {
        return password.length >= 8
    }

    const register = (username: string, password: string) => {
        console.log("Registered New Account: " + username + " " + password);
    }

    return (
        <LoginRegisterView
            login={false}
            usernameFail={"That username already exists"}
            passwordFail={"Passwords must contain 8 or more characters"}
            usernameValidate={validateUsername}
            passwordValidate={validatePassword}
            onSubmit={register}
        />
    );
}

export default RegisterView