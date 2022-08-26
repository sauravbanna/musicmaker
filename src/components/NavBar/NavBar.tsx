import styles, {elementStyles} from "./NavBarStyles"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import AppButton from "../AppButton/AppButton"
import AppDivider from "../AppDivider/AppDivider"
import AppMenu from "../AppMenu/AppMenu"
import SearchBar from "../SearchBar/SearchBar"
import {Link} from 'react-router-dom'
import { IMenuItemInfo } from "../AppMenu/AppMenuInterface"
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {useAppSelector} from "../../redux/reduxHooks"

interface INavBarElementProps {
    to: string,
    name: string
}

const NavBarElement = ({to, name} : INavBarElementProps) => {
    const [hoverStyles, setHoverStyles] = useState<any>(elementStyles(false));

    return (
        <Link
            to={to}
            onMouseEnter={() => setHoverStyles(elementStyles(true))}
            onMouseLeave={() => setHoverStyles(elementStyles(false))}
            style={hoverStyles}
       >

            <Typography variant="h6">
                {name}
            </Typography>
        </Link>
    );
}

function NavBar(props: any) {
    const currentUser = useAppSelector((state) => state.login);

    let menuItemMap : IMenuItemInfo[] = []

    if (currentUser.userId == "") {
        menuItemMap.push({name: "Login", link: "/login"})
        menuItemMap.push({name: "Register", link: "/register"})
    } else {
        menuItemMap.push({name: "Your Profile", link: "/profile"})
        menuItemMap.push({name: "Settings", link: "/settings"})
        menuItemMap.push({name: "Log Out", link:"/logout", relative: true})
    }

    return (
        <div style={styles()}>
            <div style={{display: "flex", minHeight: "100%"}}>
                <NavBarElement to="/" name="Home" />
                <AppDivider orientation="vertical"/>
                <NavBarElement to="/create" name="Create" />
            </div>
            <SearchBar width={"30%"} />
            <AppMenu
                menuItems={menuItemMap}
                name={currentUser.username}
            />
        </div>
    );
}

export default NavBar