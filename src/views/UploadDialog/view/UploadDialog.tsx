import DialogBox from "../../../components/DialogBox/DialogBox"
import DialogBackground from "../../../components/DialogBackground/DialogBackground"
import IUploadDialogProps from "./UploadDialogInterface"
import UploadDialogForm from "../components/UploadDialogForm/UploadDialogForm"
import {useInputAndErrorMap} from "../../../hooks/useInputAndError"
import {getErrorMessage} from "../../../utils/functions"
import uploadTrack from "../backend/UploadTrack"
import {useAppSelector, useAppDispatch} from "../../../redux/reduxHooks"
import {importAction} from "../../MusicMakerView/redux/notesReducer"
import {createSelector} from 'reselect'
import {useState} from 'react'

const UploadDialog = ({prevLink} : IUploadDialogProps) => {
    const currentUser = useAppSelector((state: any) => state.login);
    const dispatch = useAppDispatch();

    const selectNotes = createSelector(
        (state: any) => state.musicMaker,
        (musicMaker: any) => musicMaker.notes
    )

    const notes = useAppSelector(selectNotes)


    const titleMap = useInputAndErrorMap<string>("");
    const descriptionMap = useInputAndErrorMap<string>("");
    const imageMap = useInputAndErrorMap<File | undefined>(undefined);

    const onSubmit = async () => {
        let docId = ""

        try {
            checkEmptyFields();
            docId = await uploadTrack(
                                    titleMap.value,
                                    descriptionMap.value,
                                    imageMap.value as File,
                                    notes,
                                    currentUser
                                );
        } catch (e: any) {
            const errorMsg = getErrorMessage(e);

            if (errorMsg.toLowerCase().includes("title")) {
                titleMap.setValueError(errorMsg);
            } else if (errorMsg.toLowerCase().includes("description")) {
                descriptionMap.setValueError(errorMsg);
            } else if (errorMsg.toLowerCase().includes("image")) {
                imageMap.setValueError(errorMsg);
            } else {
                console.log(e);
            }
            return Promise.reject();
        }

        dispatch(importAction({}));

        return Promise.resolve('/track/' + docId);

    }

    const checkEmptyFields = () => {
        if (titleMap.value.length == 0) {
            throw 'Title cannot be empty'
        }

        if (descriptionMap.value.length == 0) {
            throw 'Description cannot be empty'
        }

        if (!imageMap.value) {
            console.log("error image");
            throw 'Please upload a cover art image'
        }
    }

    const clearError = () => {
        titleMap.setValueError("");
        descriptionMap.setValueError("");
        imageMap.setValueError("");
    }

    return (
        <DialogBackground>
            <DialogBox
                buttonName="Upload"
                onBackgroundClick={clearError}
                onClick={onSubmit}
                prevLink={prevLink}
                successMessage="Upload Successful! Redirecting you to your Profile..."
                failMessage="Upload Unsuccessful, please try again!"
            >
                <UploadDialogForm
                    title={titleMap}
                    description={descriptionMap}
                    image={imageMap}
                />
            </DialogBox>
        </DialogBackground>
    );
}

export default UploadDialog