import Button from "@mui/material/Button"
import IAppButtonProps from "./AppButtonInterface"
import styles from "./AppButtonStyles"
import {useState, useEffect} from 'react'
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import PendingIcon from '@mui/icons-material/Pending';

function AppButton({name, onClick, children, extraStyles, disableRipple, disableHover, disable} : IAppButtonProps) {
    const [style, setStyle] = useState<any>(styles(false));

    if (disable) {
        disableRipple = true;
        disableHover = true;
    }

    useEffect(() => {
        setStyle((prev : any) => {
            return {...prev, ...extraStyles};
        });
    }, [extraStyles]);

    const onStyleMouseEnter = () => {
        if (!disableHover) {
            setStyle((prev : any) => {
                return {...prev, ...styles(true)};
            });
        }
    }

    const onStyleMouseLeave = () => {
        if (!disableHover) {
            setStyle((prev : any) => {
                return {...prev, ...styles(false)};
            });
        }
    }

    return (
        <Button
            style={{...style}}
            onMouseEnter={onStyleMouseEnter}
            onMouseLeave={onStyleMouseLeave}
            onClick={disable ? undefined : onClick}
            disableRipple={disableRipple}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
            >
            {name.length == 0 ? null :
                disable ? <PendingIcon /> :
                <Typography variant="subtitle2">
                    {name}
                </Typography>
            }
            {children}
            </Stack>
        </Button>
    );
}

export default AppButton