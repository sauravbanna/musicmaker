import {useAppDispatch} from "../../../store/reduxHooks"
import {Button} from "@mui/material"
import {buttonStyles} from "../OptionsMenuStyles"
import {useRef} from 'react'
import {IMPORT_NOTES} from '../../../store/constants'

function ImportButton() {
    const uploadFile = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    const onClick = () => {
        uploadFile.current!.click();
    }

    const onLoad = (event : any) => {
        dispatch({type: IMPORT_NOTES, payload: JSON.parse(event.target.result)});
    }

    const onChangeFile = (event : any) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = onLoad;
        reader.readAsText(file);
    }

    return (
        <Button onClick={onClick} style={buttonStyles()}>
            Import
            <input type='file' ref={uploadFile} id='notesUpload' onChange={onChangeFile} accept='.json' style={{display: "none"}}/>
        </Button>
    );
}

export default ImportButton