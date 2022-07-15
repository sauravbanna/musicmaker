import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import AppDivider from "../../../../components/AppDivider/AppDivider"
import {gsap} from "gsap"
import {useRef, useEffect} from 'react'
import {FADE_IN} from "../../../../utils/constants"

const ProfileStat = (name : string, value : number) => {

    return (
        <Stack
            spacing={1}
            alignItems="center"
        >
            <Typography variant="subtitle1">
                {name}
            </Typography>
            <Typography variant="h4">
                {value}
            </Typography>
        </Stack>
    );
}

const ProfileStats = () => {
    const statsDiv = useRef<any>();
    const timeline = useRef<any>();

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0})
                                .fromTo(
                                    statsDiv.current,
                                    {maxWidth: "60%"},
                                    {
                                        maxWidth: "80%",
                                        duration: FADE_IN,
                                        repeat: 0,
                                        ease: "power3.out"
                                    }
                                )
    }, [])

    return (
        <div
            ref={statsDiv}
            style=
                    {
                        {
                            maxWidth: "80%"
                        }
                    }
        >
            <Stack
                spacing={1}
            >
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                >
                    {ProfileStat("Followers", 4)}
                    {ProfileStat("Following", 4)}
                    {ProfileStat("Tracks", 4)}
                </Stack>
                <AppDivider orientation="horizontal" animate={{center: true, delay: 0}} />
            </Stack>
        </div>
    );
}

export default ProfileStats