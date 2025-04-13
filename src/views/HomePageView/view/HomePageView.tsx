import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import AppDivider from "../../../components/AppDivider/AppDivider"
import FollowedArtists from "../components/FollowedArtists/FollowedArtists"
import HomePosts from "../components/HomePosts/HomePosts"
import LikedSongs from "../components/LikedSongs/LikedSongs"
import {useAppSelector} from "../../../redux/reduxHooks"
import {DEFAULT_HOME_DATA} from "../utils/constants"
import getUserHome, {IUserHomeData} from "../backend/GetUserHome"
import {useEffect, useState} from 'react'
import {getAuth} from "firebase/auth"



const HomePageView = () => {
    const currentUser = useAppSelector((state : any) => state.login)

    const [userData, setUserData] = useState<IUserHomeData>({
        following: [],
        likedTracks: [],
        homeTracks: []
    });

    useEffect(() => {
        getUserHomeData();
    }, [currentUser.userId])

    const getUserHomeData = async () => {
        if (currentUser.userId != "none") {
            try {
                setUserData(await getUserHome());
            } catch (e: any) {
                console.log(e);
            }
        } else {
            setUserData(DEFAULT_HOME_DATA);
        }
    }

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
                    <FollowedArtists following={userData.following}/>
                </Grid>
                <Grid item xs={12}>
                    <AppDivider orientation="horizontal" animate={{center: true, delay: 0}}/>
                </Grid>
                <Grid item xs={7}>
                    <HomePosts homeTracks={userData.homeTracks}/>
                </Grid>
                <Grid item>
                </Grid>

            </Grid>
        </div>
    );
}

export default HomePageView