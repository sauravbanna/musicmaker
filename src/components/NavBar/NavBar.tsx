import styles, {elementStyles} from "./NavBarStyles"
import Typography from "@mui/material/Typography"
import GitHubIcon from '@mui/icons-material/GitHub';
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
    name: string,
    children?: any,
    external: boolean
}

const NavBarElement = ({to, name, children, external} : INavBarElementProps) => {
    const [hoverStyles, setHoverStyles] = useState<any>(elementStyles(false));

    const linkContents = () => {
        return (
            <div
                 onMouseEnter={() => setHoverStyles(elementStyles(true))}
                 onMouseLeave={() => setHoverStyles(elementStyles(false))}
                 style={hoverStyles}
             >

                     {children}
                     &nbsp;
                     <Typography variant="h6">
                         {name}
                     </Typography>

             </div>
        );
    }

    if (external) {
        return (
            <a href={to} target="_blank" style={{textDecoration: "none"}}>
                {linkContents()}
            </a>
        );
    } else {
        return (
            <Link
                to={to}
                style={{textDecoration: "none"}}
           >
                {linkContents()}
            </Link>
        );
    }
}

function NavBar(props: any) {
    const currentUser = useAppSelector((state) => state.login);

    let menuItemMap : IMenuItemInfo[] = []

    if (currentUser.userId == "none") {
        menuItemMap.push({name: "Login", link: "/login"})
        menuItemMap.push({name: "Register", link: "/register"})
    } else {
        menuItemMap.push({name: "Your Profile", link: `/user/${currentUser.userId}`})
        menuItemMap.push({name: "Settings", link: "/settings"})
        menuItemMap.push({name: "Log Out", link:"/logout", relative: true})
    }

    return (
        <div style={styles()}>
            <div style={{display: "flex", minHeight: "100%"}}>
                <NavBarElement to="/" name="Home" external={false} />
                <AppDivider orientation="vertical"/>
                <NavBarElement to="/create" name="Create" external={false}/>
                <AppDivider orientation="vertical"/>
                <NavBarElement to="https://github.com/sauravbanna/musicmaker" name="GitHub" external={true}>
                    <GitHubIcon />
                </NavBarElement>
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