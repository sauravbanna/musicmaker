import styles, {homeButtonStyles} from "./NavBarStyles"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import AppButton from "../AppButton/AppButton"
import AppMenu from "../AppMenu/AppMenu"
import SearchBar from "../SearchBar/SearchBar"
import {Link} from 'react-router-dom'
import { IMenuItemInfo } from "../AppMenu/AppMenuInterface"
import {useState, useEffect} from 'react'


function NavBar(props: any) {
    const menuItemMap : IMenuItemInfo[] = []

    menuItemMap.push({name: "Your Profile", link: "/profile"})
    menuItemMap.push({name: "Settings", link: "/settings"})
    menuItemMap.push({name: "Login", link: "/login"})
    menuItemMap.push({name: "Register", link: "/register"})

    const [hoverStyles, setHoverStyles] = useState<any>(homeButtonStyles(false));

    return (
        <div style={styles()}>
            <Link
                to={"/home"}
                onMouseEnter={() => setHoverStyles(homeButtonStyles(true))}
                onMouseLeave={() => setHoverStyles(homeButtonStyles(false))}
                style={hoverStyles}
           >

                <Typography variant="h6">
                    {"Home"}
                </Typography>
            </Link>
            <SearchBar width={"30%"} />
            <AppMenu
                menuItems={menuItemMap}
                name="Profile"
            />
        </div>
    );
}

export default NavBar