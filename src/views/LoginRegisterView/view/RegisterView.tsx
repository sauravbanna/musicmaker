import LoginRegisterView from "../components/LoginRegister/LoginRegisterView"
import registerUser, {checkUniqueUsername} from "../backend/RegisterAuth"

const RegisterView = () => {
    const validateUsername = (username: string) => {
        var bool : boolean = checkUniqueUsername(username);

        console.log(bool);
        return bool;
    }

    const validatePassword = (username: string, password: string) => {
        return password.length >= 8
    }

    const register = (email: string, username: string, password: string) => {
        registerUser(email. username, password);
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