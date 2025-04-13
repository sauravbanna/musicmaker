import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import ICommentProps from "./CommentInterface"

const Comment = ({trackId} : ICommentProps) => {
    const name = "user2"
    const date = "A few seconds ago"
    const comment = "wow good job"
    const img = <img src={require("../../assets/download.png")} height={"25vh"} width={"25vh"} />
    const likes = 0

    return (
        <Grid
            container
            spacing={0}
        >
            <Grid item xs={12}>
                <Grid container  spacing={2} sx={{display: "flex", alignItems: "center"}}>
                    <Grid item xs={1} sx={{display: "flex", justifyContent: "flex-end"}}>
                        {img}
                    </Grid>
                    <Grid item xs={7} sx={{display: "flex", justifyContent: "flex-start"}}>
                        <Typography variant="subtitle2">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Typography variant="body2">
                            {date}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="subtitle2">
                    {comment}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Comment