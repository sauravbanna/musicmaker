export interface IAppButtonProps {
    name: string,
    onClick: (event: any) => void,
    children?: any,
    extraStyles?: any,
    disableRipple?: boolean,
    disableHover?: boolean,
    extraStyle?: any,
    disable?: boolean
}