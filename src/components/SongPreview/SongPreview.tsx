import {ISongPreviewProps} from "./SongPreviewInterface"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import FadeInComponent from "../FadeInComponent/FadeInComponent"
import SongPreviewButtons from "./SongPreviewButtons"
import SongComments from "./SongComments"
import AppDivider from "../AppDivider/AppDivider"
import {SONG_PREVIEW_HEIGHT, FADE_IN} from "../../utils/constants"
import {gsap} from "gsap"
import {useRef, useEffect, useState} from 'react'

interface IOpacityRef {
    opacity: number
}

function SongPreview({title, date, author, duration, id, image, likes, comments, index} : ISongPreviewProps) {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <FadeInComponent index={index}>
            <Paper
                variant="outlined"
                sx=
                    {
                        {
                            borderRadius: "0.8em",
                            overflow: "hidden"
                        }
                    }
            >
                <Grid
                    container
                    justifyContent="space-around"
                    spacing={2}
                    sx=
                        {
                            {
                                padding: "0.8em"
                            }
                        }
                >
                    <Grid item>
                        <img src={require("../../assets/download.png")} height={"100vh"} width={"100vh"} />
                    </Grid>
                    <Grid
                        item
                        xs={9}
                    >
                        <Grid container>
                            <Grid item xs={7}>
                                <Typography
                                    variant="h5"
                                >
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={5} sx={{display: "flex", justifyContent: "flex-end"}}>
                                <Typography
                                    variant="subtitle1"
                                >
                                    {date}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography
                            variant="subtitle1"
                            style={{color: "grey"}}
                        >
                            {author}
                            &nbsp;
                            |
                            &nbsp;
                            {duration}
                        </Typography>
                        &nbsp;
                        <SongPreviewButtons id={id} likes={likes} comments={comments} expanded={expanded} setExpand={setExpanded} />
                    </Grid>
                </Grid>
                <Accordion
                    disableGutters
                    expanded={expanded}
                >
                    <AccordionSummary
                        sx={
                            {
                                display: "none"
                            }
                        }
                    >

                    </AccordionSummary>
                    <AccordionDetails sx={{overflow: "hidden"}}>
                        <AppDivider orientation="horizontal"/>
                        &nbsp;
                        <SongComments id={id}/>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </FadeInComponent>
    );
}

export default SongPreview