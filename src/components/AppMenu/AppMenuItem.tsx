import { IAppMenuItemProps } from "./AppMenuInterface"
import {itemStyles} from "./AppMenuStyles"
import AppDivider from "../AppDivider/AppDivider"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import {Link, useLocation} from 'react-router-dom'
import {useState} from 'react'


const AppMenuItem = ({name, link, relative} : IAppMenuItemProps) => {
    const currentPath = useLocation();

    const [hover, setHover] = useState<boolean>(false);

    const onMouseEnter = () => {
        setHover(true);
    }

    const onMouseLeave = () => {
        setHover(false);
    }

    return (
        <Link
            to={link}
            state={relative ? {background: currentPath.pathname} : null}
            style={{textDecoration: "none", color: "black", ...itemStyles(hover)}}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Typography variant="subtitle1">
                {name}
            </Typography>
        </Link>
    );
}

export default AppMenuItem