export interface IAppMenuItemProps extends IMenuItemInfo {
}


export interface IMenuItemInfo {
    name: string,
    link: string,
    relative?: boolean
}

export interface AppMenuProps {
    menuItems: IMenuItemInfo[],
    name: string
}