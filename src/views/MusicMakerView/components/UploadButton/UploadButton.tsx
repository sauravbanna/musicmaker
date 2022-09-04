import AppButton from "../../../../components/AppButton/AppButton"
import Typography from "@mui/material/Typography"
import {makeDefaultState} from "../../redux/notesReducer"
import {checkEmptyNotes} from "../../../../utils/functions"
import {useLocation, useNavigate} from "react-router-dom"
import {useAppSelector} from "../../../../redux/reduxHooks"
import {useState} from "react"

const UploadButton = () => {
    const [uploadError, setUploadError] = useState<string>("");

    const currentPath = useLocation();
    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.login.userId);
    const notes = useAppSelector((state) => state.musicMaker.notes);

    const showLogInWarning = () => {
        if (!currentUser || currentUser == "none") {
            setUploadError("Please log in to upload, export notes to save your progress");
            setTimeout(() => setUploadError(""), 5000);

        } else if (checkEmptyNotes(notes)) {
            setUploadError("Please draw some notes to upload.");
            setTimeout(() => setUploadError(""), 5000);
        } else {
            navigate("/upload", {state: {background: currentPath.pathname}});
        }
    }


    return (
        <div
            style={
                {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }
            }
        >
            <AppButton
                name="Upload"
                onClick={showLogInWarning}
            >
            </AppButton>
            &nbsp;
            <Typography variant="subtitle1">
                {uploadError}
            </Typography>
        </div>
    );
}

export default UploadButton