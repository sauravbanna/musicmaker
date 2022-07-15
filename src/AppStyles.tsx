import { BUTTON_FONT, APP_COLOR, BUTTON_HOVER } from "./utils/constants"
import { createTheme } from '@mui/material/styles'


const AppTheme = createTheme({
    typography: {
        fontFamily: BUTTON_FONT
    },
    palette: {
        success: {
            main: BUTTON_HOVER
        }
    }
});

export default AppTheme