import IconButton from "@mui/material/IconButton"
import iconStyles from "./AppIconButtonStyle"
import IAppIconButtonProps from "./AppIconButtonInterface"
import {useState} from 'react'

const AppIconButton = ({onClick, icon, clickIcon, clicked, onMouseDown, onMouseUp, children} : IAppIconButtonProps) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <IconButton
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            disableRipple
            sx={{padding: "0em"}}
            >
            <div
                style={iconStyles(clicked, hover)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {clicked ? clickIcon : icon}
                {children}
            </div>
        </IconButton>
    );
}

export default AppIconButton