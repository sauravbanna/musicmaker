import LoginRegisterView from "../components/LoginRegister/LoginRegisterView"

const LoginView = () => {
    const usernameValidate = (username: string) => {
        return username === "User1"
    }

    const passwordValidate = (username: string, password: string) => {
        if (username === "User1") {
            return password === "yeah"
        }
        else return false
    }

    const onSubmit = (username: string, password: string) => {
        console.log(username + " " + password + " " + "Registered!");
    }

    return (
        <LoginRegisterView
            login={true}
            usernameFail="That user does not exist"
            passwordFail="Wrong Password"
            usernameValidate={usernameValidate}
            passwordValidate={passwordValidate}
            onSubmit={onSubmit}
        />
    );
}

export default LoginView