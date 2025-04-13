export default interface IAppIconButtonProps {
    onClick: (e: any) => void,
    icon: any,
    clickIcon: any,
    clicked: boolean,
    onMouseDown?: () => void,
    onMouseUp?: () => void,
    children?: any,
    styled?: boolean
}