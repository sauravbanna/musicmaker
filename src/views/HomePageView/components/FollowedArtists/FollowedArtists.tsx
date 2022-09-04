import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ArtistPreview from "../../../../components/ArtistPreview/ArtistPreview"
import ScrollButtons from "../ScrollButtons/ScrollButtons"
import useScrollComponent from "../../hooks/useScrollComponent"
import getFollowedArtists, {IArtistData} from "../../backend/GetFollowedArtists"
import Button from "@mui/material/Button"
import {useState, useEffect} from 'react'

interface IFollowedArtistsProps {
    following: Array<string>
}

const FollowedArtists = ({following} : IFollowedArtistsProps) => {
    const [followingData, setFollowingData] = useState<Array<IArtistData>>([]);

    useEffect(() => {
        getFollowedArtistsData();
    }, [following])

    const getFollowedArtistsData = async () => {
        try {
            setFollowingData(await getFollowedArtists(following));
        } catch (e: any) {
            console.log(e);
        }
    }


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
                    {followingData.map((ele: IArtistData, i: number) => {
                        return (
                            <ArtistPreview index={i} name={ele.name} image={ele.image} id={ele.id}/>
                        );
                    })}
                </Stack>
            </div>
        </Stack>
    );
}

export default FollowedArtists