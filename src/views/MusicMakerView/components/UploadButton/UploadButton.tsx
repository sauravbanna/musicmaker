import AppButton from "../../../../components/AppButton/AppButton"
import {Link, useLocation} from "react-router-dom"

const UploadButton = () => {
    const currentPath = useLocation();

    console.log(currentPath.pathname);

    return (
        <Link
            to="/upload"
            state={
                {
                    background: currentPath.pathname
                }
            }
            style={
                {
                    textDecoration: "none"
                }
            }
        >
            <AppButton
                name="Upload"
                onClick={() => console.log("clicked")}
            >

            </AppButton>
        </Link>
    );
}

export default UploadButton