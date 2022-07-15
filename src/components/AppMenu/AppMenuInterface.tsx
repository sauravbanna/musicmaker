export interface IAppMenuItemProps extends IMenuItemInfo {
}


export interface IMenuItemInfo {
    name: string,
    link: string
}

export interface AppMenuProps {
    menuItems: IMenuItemInfo[],
    name: string
}