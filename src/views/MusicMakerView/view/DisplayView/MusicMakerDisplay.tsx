import UploadButton from "../../components/UploadButton/UploadButton"
import MusicMaker from "../../components/ui/MusicMaker/MusicMaker"
import TrackInfo from "../../components/ui/TrackInfo/TrackInfo"
import Stack from "@mui/material/Stack"
import getNotesData, {ITrackDataWithNotesAndFeedback} from "../../backend/GetNotesData"
import {importAction, makeDefaultState} from "../../redux/notesReducer"
import {Timestamp} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import styles from "../MusicMakerViewStyle"
import {useAppDispatch} from "../../../../redux/reduxHooks"


const MusicMakerDisplay = () => {
  const [trackData, setTrackData] = useState<ITrackDataWithNotesAndFeedback>({
        title: "",
        image: "",
        description: "",
        username: "",
        userId: "",
        date: Timestamp.now(),
        likes: [],
        comments: [],
        notes: makeDefaultState()
  });

  const dispatch = useAppDispatch();
  const {trackId} = useParams();

  useEffect(() => {
    if (trackId) {
        getNotes(trackId);
    }
  }, [trackId])

  const getNotes = async (trackId : string) => {
    try {
        setTrackData(await getNotesData(trackId));
    } catch (e: any) {
        console.log(e);
    }
  }

  useEffect(() => {
      dispatch(importAction(trackData.notes));
  }, [trackData])


  return (
    <div
        style={
            {
                position: "relative",
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh"
            }
        }
    >
        <Stack
            justifyContent="space-evenly"
            style={
                {
                    minHeight: "100%",
                    position: "absolute"
                }
            }
        >
            <TrackInfo
                title={trackData.title}
                image={trackData.image}
                description={trackData.description}
                username={trackData.username}
                date={trackData.date}
                likes={trackData.likes}
                id={trackId ? trackId : "default"}
            />
            <MusicMaker readOnly={true} />
        </Stack>
    </div>
  );
}

export default MusicMakerDisplay;


