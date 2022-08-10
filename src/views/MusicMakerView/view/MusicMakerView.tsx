import {MusicDisplay} from '../components/ui/MusicDisplay/MusicDisplay'
import {InstrumentSelect} from "../components/control/InstrumentSelect/InstrumentSelect"
import OptionsMenu from "../components/control/OptionsMenu/OptionsMenu"
import UploadButton from "../components/UploadButton/UploadButton"
import {INSTRUMENTS as instruments} from "../utils/constants"
import {Button} from '@mui/material'
import {useState, useRef, useEffect} from 'react'
import { AudioContextProvider } from "../../../utils/context"
import { FADE_IN } from "../../../utils/constants"
import styles, {musicStyles} from "./MusicMakerStyle"
import {useAppSelector} from "../../../redux/reduxHooks"
import {gsap} from 'gsap'

function MusicMakerView() {
  const [instrument, setInstrument] = useState<number>(0);
  const [loadedPanels, setLoadedPanels] = useState<Array<string>>([instruments[0]]);

  const audioContext = useRef(new window.AudioContext());

  const onKeyDown = (key : KeyboardEvent) => {
    if (key.key == " ") {

    }
  };

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


  return (
    <div style={styles()}>
        <div style={musicStyles()} ref={pageDiv}>
            <InstrumentSelect onClick={setInstrument} setLoadedPanels={setLoadedPanels}/>
                    <AudioContextProvider value={audioContext}>
                        <MusicDisplay loadedPanels={loadedPanels} activeInstrument={instruments[instrument]} />
                    </AudioContextProvider>
                    &nbsp;
                <OptionsMenu />
        </div>
        <UploadButton />
    </div>
  );
}

export default MusicMakerView;


