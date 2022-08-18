export default interface IAppIconButtonProps {
    onClick: () => void,
    icon: any,
    clickIcon: any,
    clicked: boolean,
    onMouseDown?: () => void,
    onMouseUp?: () => void,
    children?: any,
    styled?: boolean
}