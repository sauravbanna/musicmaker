import MusicDisplay from "../MusicDisplay/MusicDisplay"
import InstrumentSelect from "../../control/InstrumentSelect/InstrumentSelect"
import OptionsMenu from "../../control/OptionsMenu/OptionsMenu"
import { AudioContextProvider } from "../../../../../utils/context"
import { FADE_IN } from "../../../../../utils/constants"
import {INSTRUMENTS as instruments} from "../../../utils/constants"
import styles from "./MusicMakerStyle"
import {useRef, useState, useEffect} from 'react'
import {gsap} from 'gsap'

interface IMusicMakerProps {
    readOnly: boolean
}

const MusicMaker = ({readOnly} : IMusicMakerProps) => {
    const [instrument, setInstrument] = useState<number>(0);
    const [loadedPanels, setLoadedPanels] = useState<Array<string>>([instruments[0]]);

    const pageDiv = useRef<any>();
    const timeline = useRef<any>();

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0})
                              .fromTo(
                                  pageDiv.current,
                                  {maxHeight: "0%"},
                                  {
                                      maxHeight: "100%",
                                      duration: FADE_IN,
                                      repeat: 0,
                                      ease: "power2.out"
                                  }
                              )
    }, [])

    const audioContext = useRef(new window.AudioContext());

    return (
        <div style={styles()} ref={pageDiv}>
            <InstrumentSelect onClick={setInstrument} setLoadedPanels={setLoadedPanels}/>
            <AudioContextProvider value={audioContext}>
                <MusicDisplay
                    loadedPanels={loadedPanels}
                    activeInstrument={instruments[instrument]}
                    readOnly={readOnly}
                />
            </AudioContextProvider>
            &nbsp;
            <OptionsMenu />
        </div>
    );
}

export default MusicMaker