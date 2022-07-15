import {PROFILE_INFO_HEIGHT} from "../../utils/constants"
import {FADE_IN} from "../../../../utils/constants"
import Stack from "@mui/material/Stack"
import AppButton from "../../../../components/AppButton/AppButton"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useRef, useEffect} from 'react'
import {gsap} from 'gsap'

function ProfileActions() {
    const timeline = useRef<any>();
    const buttonsDiv = useRef<any>();

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0}).fromTo(buttonsDiv.current, {minHeight: "30%"}, {minHeight: "100%", duration: FADE_IN, repeat: 0, ease: "power3.out"}, 0);
    }, [])

    return (
        <div
            style=
                    {
                        {
                            minHeight: "100%",
                            justifyContent: "flex-start",
                            display: "flex"
                        }
                    }
        >
            <div
                style=
                        {
                            {
                                minHeight: "100%",
                                alignItems: "center",
                                display: "flex"
                            }
                        }
            >
                <Stack
                    ref={buttonsDiv}
                    sx=
                        {
                            {
                                position: "relative"
                            }
                        }
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <AppButton name="Follow"><FavoriteBorderIcon fontSize="small"/></AppButton>
\                   <AppButton name="Share"><SendIcon fontSize="small" /></AppButton>
                    <AppButton name=""><MoreHorizIcon fontSize="small" /></AppButton>
                </Stack>
            </div>
        </div>
    );
}

export default ProfileActions