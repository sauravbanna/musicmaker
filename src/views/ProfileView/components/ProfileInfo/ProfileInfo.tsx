import {PROFILE_INFO_HEIGHT, PROFILE_INFO_WIDTH} from "../../utils/constants"
import IProfileInfoProps from "./ProfileInfoInterface"
import Grid from "@mui/material/Grid"
import {BUTTON_HOVER} from "../../../../utils/constants"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import AppDivider from "../../../../components/AppDivider/AppDivider"

function ProfileInfo({username, about, image} : IProfileInfoProps) {
    return (
        <Stack
            sx=
                {
                    {
                        justifyContent: "center",
                        display: "flex"
                    }
                }
            spacing={8}
            direction="row"
        >
            <img
                src={
                    image == "default" ? require('../../../../assets/download.png')
                                        : image
                }
                height={"200vh"}
                width={"200vh"}
                style={{clipPath: "circle(50%)"}}
            />
            <Stack
                spacing={2}
                divider={
                    <AppDivider
                        orientation="horizontal"
                        animate={{center: false, delay: 0}}
                    />
                }
            >
                <Typography variant="h2"> {username} </Typography>
                <Typography variant="h5"> {about} </Typography>
            </Stack>

        </Stack>
    );
}


export default ProfileInfo