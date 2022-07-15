import Button from "@mui/material/Button"
import {IAppButtonProps} from "./AppButtonInterface"
import styles from "./AppButtonStyles"
import {useState, useEffect} from 'react'
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

function AppButton({name, onClick, children, extraStyles, disableRipple, disableHover, extraStyle} : IAppButtonProps) {
    const [style, setStyle] = useState<any>(styles(false));

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
            style={{...style, ...extraStyle}}
            onMouseEnter={onStyleMouseEnter}
            onMouseLeave={onStyleMouseLeave}
            onClick={onClick}
            disableRipple={disableRipple}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
            >
            {name.length == 0 ? null :
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