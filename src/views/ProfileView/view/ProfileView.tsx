import Grid from '@mui/material/Grid';
import Divider from "@mui/material/Divider"
import {APP_COLOR} from "../../../utils/constants"
import {PROFILE_INFO_WIDTH, PROFILE_INFO_HEIGHT, PROFILE_POSTS_WIDTH, PROFILE_PAGE_WIDTH} from "../utils/constants"
import {BACKGROUND_COLOR, FADE_IN, ELASTIC_EASE} from "../../../utils/constants"
import {useRef, useEffect} from "react"
import ProfileInfo from "../components/ProfileInfo/ProfileInfo"
import ProfileActions from "../components/ProfileActions/ProfileActions"
import ProfilePosts from "../components/ProfilePosts/ProfilePosts"
import ProfileStats from "../components/ProfileStats/ProfileStats"
import AppDivider from "../../../components/AppDivider/AppDivider"
import getProfileData, {IProfileDataWithMetrics} from "../backend/GetProfileData"
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import {gsap} from "gsap"

function ProfileView(props: any) {
    const pageDiv = useRef<any>();
    const timeline = useRef<any>();

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0})
                                .fromTo(
                                    pageDiv.current,
                                    {maxWidth: "60%"},
                                    {
                                        maxWidth: PROFILE_PAGE_WIDTH,
                                        duration: FADE_IN,
                                        repeat: 0,
                                        ease: ELASTIC_EASE
                                    }
                                )
    }, [])

    const {uid} = useParams();
    const [profileData, setProfileData] = useState<IProfileDataWithMetrics>({
        username: "default",
        about: "default",
        image: "default",
        tracks: [],
        tracksCount: 0,
        followingCount: 0,
        following: [],
        likedTracks: [],
        likedTracksCount: 0,
        followersCount: 0,
        followers: []
    });

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        try {
            setProfileData(await getProfileData(String(uid)));
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <div
            style=
                    {
                        {
                            backgroundColor: APP_COLOR,
                            display: "flex",
                            justifyContent: "center"
                        }
                    }
        >
            <Grid
                ref={pageDiv}
                container
                spacing={2}
                style=
                        {
                            {
                                maxWidth: PROFILE_PAGE_WIDTH,
                                position: "absolute",
                                top: "5%",
                                display: "flex"
                            }
                        }
            >
                <Grid
                    item
                    xs={PROFILE_INFO_WIDTH}
                    sx={
                            {
                                minHeight: PROFILE_INFO_HEIGHT,
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                            }
                        }
                >
                    <ProfileInfo
                        username={profileData.username}
                        about={profileData.about}
                        image={profileData.image}
                    />
                </Grid>
                <Grid item xs={12 - PROFILE_INFO_WIDTH}>
                    <ProfileActions />
                </Grid>
                <Grid item xs={12}>
                    <AppDivider orientation="horizontal" animate={{center: true, delay: 0}} />
                </Grid>
                <Grid item xs={PROFILE_POSTS_WIDTH}>
                    <ProfilePosts
                        tracks={profileData.tracks}
                    />
                </Grid>
                <Grid item xs={12 - PROFILE_POSTS_WIDTH}>
                    <ProfileStats
                        tracksCount={profileData.tracksCount}
                        following={profileData.following}
                        followers={profileData.followers}
                    />
                </Grid>
            </Grid>

        </div>
    );

}

export default ProfileView