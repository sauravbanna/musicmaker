import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import FadeInComponent from "../FadeInComponent/FadeInComponent"

interface IArtistPreviewProps {
    index: number
}

const ArtistPreview = ({index} : IArtistPreviewProps) => {
    const name = "user2"
    const img = <img src={require("../../assets/download.png")} height={"150vh"} width={"150vh"} />

    return (
        <FadeInComponent index={index}>
            <Paper
                sx={
                    {
                        borderRadius: "1em"
                    }
                }
            >
                <Stack
                    sx={
                        {
                            display: "flex",
                            alignItems: "center",
                            padding: "1em"
                        }
                    }
                    spacing={2}
                >
                    {img}
                    <Typography variant="h5">
                        {name}
                    </Typography>
                </Stack>
            </Paper>
        </FadeInComponent>
    );
}

export default ArtistPreview