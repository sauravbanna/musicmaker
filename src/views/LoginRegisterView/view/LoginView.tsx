import LoginRegisterView from "../components/LoginRegister/LoginRegisterView"
import {loginUser} from "../backend/LoginAuth"

const LoginView = () => {

    const onSubmit = (email: string, username: string, password: string) => {
        return loginUser(username, password);
    }

    return (
        <LoginRegisterView
            login={true}
            usernameFail="That user does not exist"
            passwordFail="Wrong Password"
            onSubmit={onSubmit}
        />
    );
}

export default LoginView