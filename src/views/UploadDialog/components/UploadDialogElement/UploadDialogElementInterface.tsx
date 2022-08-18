export default interface IUploadDialogFormElementProps {
    name: string,
    onChange: (e: any) => void,
    value: string,
    errorStatus: boolean,
    errorString: string,
    multiline?: boolean
}
