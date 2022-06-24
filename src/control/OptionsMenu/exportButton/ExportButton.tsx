import {Button} from "@mui/material"
import {shallowEqual} from 'react-redux'
import {useEffect} from 'react'
import {useAppSelector} from '../../../store/reduxHooks'
import {allNotesSelector} from "../OptionsMenuSelectors"
import {buttonStyles} from "../OptionsMenuStyles"

function ExportButton() {
    const allNotes = useAppSelector(allNotesSelector, shallowEqual);

    useEffect(() => {
        console.log(allNotes);
    }, [allNotes])

    const onClick = () => {
        console.log(allNotes);
        const jsonObj = JSON.stringify(allNotes);
        const downloadBlob = new Blob([jsonObj], {type: 'application/json'});
        const downloadURL = URL.createObjectURL(downloadBlob);

        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "notes";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Button style={buttonStyles()} onClick={onClick}>Export</Button>
    );
}

export default ExportButton