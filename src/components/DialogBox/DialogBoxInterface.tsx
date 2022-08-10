export default interface IDialogBoxProps {
    buttonName: string,
    onClick: (e : any) => void,
    prevLink: string,
    nextLink: string,
    children: any
}