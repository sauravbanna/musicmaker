import DialogBox from "../../../components/DialogBox/DialogBox"
import DialogBackground from "../../../components/DialogBackground/DialogBackground"
import IUploadDialogProps from "./UploadDialogInterface"
import UploadDialogForm from "../components/UploadDialogForm/UploadDialogForm"

const UploadDialog = ({prevLink} : IUploadDialogProps) => {
    return (
        <DialogBackground>
            <DialogBox
                buttonName="Upload"
                onClick={(e: any) => console.log("clicked")}
                prevLink={prevLink}
                nextLink="/"
            >
                <UploadDialogForm />
            </DialogBox>
        </DialogBackground>
    );
}

export default UploadDialog