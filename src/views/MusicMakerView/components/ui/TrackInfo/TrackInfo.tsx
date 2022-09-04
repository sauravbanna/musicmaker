import ITrackInfoProps from "./TrackInfoInterface"
import AppDivider from "../../../../../components/AppDivider/AppDivider"
import LikeButton from "../../../../../components/LikeButton/LikeButton"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

const TrackInfo = ({title, image, description, username, date, likes, id} : ITrackInfoProps) => {
    return (
        <Stack
            spacing={2}
        >
            <Grid container>
                <Grid item xs={9}>
                    <Stack
                        spacing={2}
                    >
                        <Typography variant="h3">
                            {title}
                        </Typography>
                        <AppDivider
                            orientation="horizontal"
                        />
                        <Typography variant="h5">
                            {description}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={3}
                    sx={
                        {
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }
                    }
                >
                    <img src={image} height="120vh" width="120vh"/>
                </Grid>
            </Grid>
            &nbsp;
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <div>
                    <LikeButton trackId={id}/>
                    {likes.length}
                </div>
            </Stack>
        </Stack>
    );
}

export default TrackInfo