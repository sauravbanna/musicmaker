import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ArtistPreview from "../../../../components/ArtistPreview/ArtistPreview"

const FollowedArtists = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    return (
        <Stack spacing={2} sx={{paddingTop: "1em"}}>
            <Typography variant="h4">
                {"Following"}
            </Typography>
            <Stack
                direction="row"
                spacing={3}
                sx={
                    {
                        overflow: "hidden"
                    }
                }
            >
                {array.map((ele: number, i: number) => {
                    return (
                        <ArtistPreview index={i}/>
                    );
                })}
            </Stack>
        </Stack>
    );
}

export default FollowedArtists