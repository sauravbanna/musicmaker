import {useAppDispatch} from "../../../../../redux/reduxHooks"
import {useRef} from 'react'
import {importAction} from "../../../redux/notesReducer"
import AppButton from "../../../../../components/AppButton/AppButton"
import FileUploadIcon from '@mui/icons-material/FileUpload';

function ImportButton() {
    const uploadFile = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    const onClick = () => {
        uploadFile.current!.click();
    }

    const onLoad = (event : any) => {
        dispatch(importAction(JSON.parse(event.target.result)));
    }

    const onChangeFile = (event : any) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = onLoad;
        reader.readAsText(file);
    }

    return (
        <AppButton
            onClick={onClick}
            name="Import"
        >
            <FileUploadIcon />
            <input type='file' ref={uploadFile} id='notesUpload' onChange={onChangeFile} accept='.json' style={{display: "none"}}/>
        </AppButton>
    );
}

export default ImportButton