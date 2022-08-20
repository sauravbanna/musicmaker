import AppButton from "../../../../components/AppButton/AppButton"
import {useLocation, useNavigate} from "react-router-dom"
import {useAppSelector} from "../../../../redux/reduxHooks"

const UploadButton = () => {
    const currentPath = useLocation();
    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.login);

    const showLogInWarning = () => {
        if (checkCurrentUserNull()) {
            console.log("not logged in");
        } else {
            navigate("/upload", {state: {background: currentPath.pathname}});
        }
    }

    const checkCurrentUserNull = () => {
        return currentUser.username == "" && currentUser.userId == ""
    }

    return (
        <AppButton
            name="Upload"
            onClick={showLogInWarning}
        >
        </AppButton>
    );
}

export default UploadButton