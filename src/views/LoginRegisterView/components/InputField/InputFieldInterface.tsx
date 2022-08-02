export default interface InputFieldProps {
    errorStatus: boolean,
    errorString: string,
    textValue: string,
    onChange: (e : any) => void,
    name: string,
    fullWidth: boolean
}