import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import useFadeInComponent from "../../hooks/useFadeInComponent"


interface IArtistPreviewProps {
    index: number
}

const ArtistPreview = ({index} : IArtistPreviewProps) => {
    const name = "user2"
    const img = <img src={require("../../assets/download.png")} height={"130vh"} width={"130vh"} />

    const fadeDiv = useFadeInComponent(index);

    return (
        <Paper
            ref={fadeDiv}
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
                        padding: "1.5em"
                    }
                }
                spacing={2}
            >
                {img}
                <Typography variant="h5">
                    {name}
                    {index}
                </Typography>
            </Stack>
        </Paper>
    );
}

export default ArtistPreview