import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ArtistPreview from "../../../../components/ArtistPreview/ArtistPreview"
import ScrollButtons from "../ScrollButtons/ScrollButtons"
import useScrollComponent from "../../hooks/useScrollComponent"
import Button from "@mui/material/Button"
import {useState} from 'react'

const FollowedArtists = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    const [scrollDiv, containerDiv, onClickLeft, onClickRight, leftButtonActive, rightButtonActive] = useScrollComponent(0);

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Stack spacing={3}
            sx={{paddingTop: "1em"}}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <Typography variant="h4">
                {"Following"}
            </Typography>
            <div
                ref={containerDiv}
                style={
                    {
                        display: "flex",
                        overflow: "hidden",
                        alignItems: "center",
                        minWidth: "100%"
                    }
                }
            >
                <ScrollButtons
                    onClickLeft={onClickLeft}
                    onClickRight={onClickRight}
                    visible={visible}
                    leftButtonActive={leftButtonActive}
                    rightButtonActive={rightButtonActive}
                />
                <Stack
                    ref={scrollDiv}
                    direction="row"
                    spacing={5}
                    sx={
                        {
                            position: "relative"
                        }
                    }
                >
                    {array.map((ele: number, i: number) => {
                        return (
                            <ArtistPreview index={i}/>
                        );
                    })}
                </Stack>
            </div>
        </Stack>
    );
}

export default FollowedArtists