import {shallowEqual} from 'react-redux'
import {useEffect} from 'react'
import {useAppSelector} from '../../../../../redux/reduxHooks'
import {allNotesSelector} from "../../../utils/MusicMakerSelectors"
import AppButton from "../../../../../components/AppButton/AppButton"

function ExportButton() {
    const allNotes = useAppSelector(allNotesSelector, shallowEqual);

    const onClick = () => {
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
        <AppButton name="Export" onClick={onClick} />
    );
}

export default ExportButton