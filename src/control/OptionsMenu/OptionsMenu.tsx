import {Button} from "@mui/material"
import {BUTTON_FONT, BUTTON_BACKGROUND, BUTTON_TEXT_COLOR} from "../../store/constants"
import {menuStyles, buttonStyles} from "./OptionsMenuStyles"
import IOptionsMenuProps from "./OptionsMenuInterface"
import ExportButton from "./exportButton/ExportButton"
import ImportButton from "./importButton/ImportButton"

function OptionsMenu(props : IOptionsMenuProps) {

    return (
        <div style={menuStyles()}>
            <ExportButton />
            <ImportButton />
        </div>
    );
}

export default OptionsMenu