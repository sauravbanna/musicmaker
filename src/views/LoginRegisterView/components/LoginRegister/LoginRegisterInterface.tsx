export default interface ILoginRegisterProps {
    login: boolean,
    usernameFail: string,
    passwordFail: string,
    onSubmit: (email: string, username: string, password: string) => void
}