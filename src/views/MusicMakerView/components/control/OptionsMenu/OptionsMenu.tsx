import {menuStyles} from "./OptionsMenuStyles"
import IOptionsMenuProps from "./OptionsMenuInterface"
import ExportButton from "./ExportButton"
import ImportButton from "./ImportButton"
import PlayButton from "../PlayButton/PlayButton"

function OptionsMenu(props : IOptionsMenuProps) {


    return (
        <div style={menuStyles()}>
            <PlayButton />
            <div>
                <ExportButton />
                &nbsp;
                &nbsp;
                <ImportButton />
            </div>
        </div>
    );
}

export default OptionsMenu