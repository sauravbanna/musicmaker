import LoginRegisterView from "../components/LoginRegister/LoginRegisterView"
import registerUser, {checkUniqueUsername, validatePassword} from "../backend/RegisterAuth"
import {useAppSelector} from "../../../redux/reduxHooks"
import {useEffect} from 'react'

const RegisterView = () => {

    const register = async (email: string, username: string, password: string) => {
        return checkUniqueUsername(username)
                .then((username) => {
                    return validatePassword(password)
                        .then((password) => {
                            return registerUser(email, username, password);
                        })
                })

    }

    return (
        <LoginRegisterView
            login={false}
            usernameFail={"That username already exists"}
            passwordFail={"Passwords must contain 8 or more characters"}
            onSubmit={register}
        />
    );
}

export default RegisterView