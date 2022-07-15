import {PROFILE_INFO_HEIGHT, PROFILE_INFO_WIDTH} from "../../utils/constants"
import Grid from "@mui/material/Grid"
import {BUTTON_HOVER} from "../../../../utils/constants"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import AppDivider from "../../../../components/AppDivider/AppDivider"

function ProfileInfo() {
    return (
        <div
            style=
                {
                    {
                        justifyContent: "center",
                        display: "flex"
                    }
                }
        >
            <Grid
                container
                direction="row-reverse"
                justifyContent="flex-end"
                alignItems="center"
                sx=
                    {
                        {
                            minHeight: PROFILE_INFO_HEIGHT,
                            maxWidth: "50%"
                        }
                    }
            >
                <Grid item>
                    <Stack
                        spacing={0.5}
                        divider={<AppDivider orientation="horizontal" animate={{center: false, delay: 0}}/>}
                    >
                        <Typography variant="h2"> h </Typography>
                        <Typography variant="h4"> f </Typography>
                    </Stack>
                </Grid>
                <Grid item>
                    <img
                        src={require('../../../../assets/download.png')}
                        height={"80%"}
                        width={"80%"}
                        style={{clipPath: "circle(50%)"}}
                    />
                </Grid>
            </Grid>
        </div>
    );
}


export default ProfileInfo