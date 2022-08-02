import TextField from "@mui/material/TextField"
import {styled} from '@mui/system'
import {BACKGROUND_COLOR, SHADOW} from "../../../../utils/constants"


const StyledTextField = styled(TextField)({
        borderRadius: "0.5em",
        '.MuiOutlinedInput-root': {
            borderRadius: "0.5em",
            backgroundColor: "white",
            boxShadow: SHADOW
        },
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: BACKGROUND_COLOR
        },
        '.MuiFormHelperText-root': {
            fontSize: "0.9em"
        }
});

export default StyledTextField;