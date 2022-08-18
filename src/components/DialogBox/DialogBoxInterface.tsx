export default interface IDialogBoxProps {
    buttonName: string,
    onClick: (e : any) => Promise<string>,
    onBackgroundClick?: () => void
    prevLink: string,
    children: any,
    style?: any
}