import {menuStyles} from "./OptionsMenuStyles"
import IOptionsMenuProps from "./OptionsMenuInterface"
import ExportButton from "./ExportButton"
import ImportButton from "./ImportButton"

function OptionsMenu(props : IOptionsMenuProps) {


    return (
        <div style={menuStyles()}>
            <ExportButton />
            &nbsp;
            &nbsp;
            <ImportButton />
        </div>
    );
}

export default OptionsMenu