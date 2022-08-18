export default interface IAppButtonProps {
    name: string,
    onClick: (event: any) => void,
    children?: any,
    extraStyles?: any,
    disableRipple?: boolean,
    disableHover?: boolean
    disable?: boolean
}