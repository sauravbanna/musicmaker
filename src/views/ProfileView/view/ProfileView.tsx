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
                                minHeight: PROFILE_INFO_HEIGHT
                            }
                        }
                >
                    <ProfileInfo />
                </Grid>
                <Grid item xs={12 - PROFILE_INFO_WIDTH}>
                    <ProfileActions />
                </Grid>
                <Grid item xs={12}>
                    <AppDivider orientation="horizontal" animate={{center: true, delay: 0}} />
                </Grid>
                <Grid item xs={PROFILE_POSTS_WIDTH}>
                    <ProfilePosts />
                </Grid>
                <Grid item xs={12 - PROFILE_POSTS_WIDTH}>
                    <ProfileStats />
                </Grid>
            </Grid>

        </div>
    );

}

export default ProfileView