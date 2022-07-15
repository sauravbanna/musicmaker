import {useEffect, useRef, useContext} from 'react'
import AudioContext from "../../../../../utils/context"
import MusicPlayerProps from "./MusicPlayerInterface"
import styles from './MusicPlayerStyle'
import {notesSelectors} from "../../../utils/constants"
import {playSelector} from "../../../utils/MusicMakerSelectors"
import {useAppSelector} from "../../../../../redux/reduxHooks"
import {shallowEqual} from 'react-redux'

function MusicPlayer({playNote, instrument, note} : MusicPlayerProps) {
    const noteRef = useRef<any>();
    const play = useRef<any>();
    const audioContext = useContext<any>(AudioContext);

    const appPlay = useAppSelector(playSelector, shallowEqual);

    useEffect(() => {
        fetch("/notes/" + instrument.toLowerCase() + "/" + notesSelectors(instrument)[note] + ".wav")
        .then(data => {
            return data.arrayBuffer();
         })
        .then(arrayBuffer => {
            const decode = audioContext.current.decodeAudioData(arrayBuffer);
            return decode;
        })
        .then(decodedAudio => {
            noteRef.current = decodedAudio;
        });
    }, []);

    useEffect(() => {
        if (!playNote || !appPlay) {
            if (typeof play.current !== "undefined") {
                play.current.stop();
            }
        } else {
            if (audioContext.state === "suspended") {
                resumeContext();
            }

            play.current = audioContext.current.createBufferSource();
            play.current.buffer = noteRef.current;
            play.current.connect(audioContext.current.destination);
            play.current.start(0, 0);
        }
    }, [playNote, appPlay]);

    async function resumeContext() {
        await audioContext.current.resume();
    }

    return (
        <div style={styles()}></div>
    );
}

export default MusicPlayer