import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import {useNavigate} from 'react-router-dom'
import useFadeInComponent from "../../hooks/useFadeInComponent"


interface IArtistPreviewProps {
    index: number,
    id: string,
    name: string,
    image: string
}

const ArtistPreview = ({index, id, name, image} : IArtistPreviewProps) => {

    const fadeDiv = useFadeInComponent(index);

    const navigate = useNavigate();

    return (
        <Paper
            ref={fadeDiv}
            sx={
                {
                    borderRadius: "1em",
                    cursor: "pointer"
                }
            }
            onClick={() => {
                navigate(`/user/${id}`);
            }}
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
                <img src={image} height={"130vh"} width={"130vh"} />
                <Typography variant="h5">
                    {name}
                </Typography>
            </Stack>
        </Paper>
    );
}

export default ArtistPreview