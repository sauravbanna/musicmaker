import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import AppDivider from "../../../components/AppDivider/AppDivider"
import FollowedArtists from "../components/FollowedArtists/FollowedArtists"
import HomePosts from "../components/HomePosts/HomePosts"
import LikedSongs from "../components/LikedSongs/LikedSongs"
import {useAppSelector} from "../../../redux/reduxHooks"
import {useEffect} from 'react'

const HomePageView = () => {

    return (
        <div
            style={
                {
                    display: "flex",
                    justifyContent: "center"
                }
            }
        >
            <Grid
                container
                style={
                    {
                        position: "absolute",
                        top: "5%",
                        maxWidth: "70%",
                        display: "flex",
                    }
                }
                spacing={5}
            >
                <Grid item xs={12}>
                    <FollowedArtists />
                </Grid>
                <Grid item xs={12}>
                    <AppDivider orientation="horizontal" animate={{center: true, delay: 0}}/>
                </Grid>
                <Grid item xs={7}>
                    <HomePosts />
                </Grid>
                <Grid item>
                </Grid>
                <Grid item xs={4}>
                    <Stack>
                        <LikedSongs />
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePageView