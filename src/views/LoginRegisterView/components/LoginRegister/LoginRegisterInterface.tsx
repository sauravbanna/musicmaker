export default interface ILoginRegisterProps {
    login: boolean,
    usernameFail: string,
    passwordFail: string,
    usernameValidate: (username: string) => boolean,
    passwordValidate: (username: string, password: string) => boolean,
    onSubmit: (username: string, password: string) => void
}