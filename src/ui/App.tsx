import {MusicDisplay} from './MusicDisplay/MusicDisplay'
import {InstrumentSelect} from "../control/InstrumentSelect/InstrumentSelect"
import OptionsMenu from "../control/OptionsMenu/OptionsMenu"
import {INSTRUMENTS as instruments} from "../store/constants"
import {Button} from '@mui/material'
import {useState, useRef, useEffect} from 'react'
import {Provider} from 'react-redux'
import { AudioContextProvider } from '../store/context'
import PlayButton from "../control/PlayButton/PlayButton"
import store from "../store/store"
import styles, {musicStyles} from "./AppStyle"

function App() {
  const [instrument, setInstrument] = useState<number>(0);
  const [loadedPanels, setLoadedPanels] = useState<Array<string>>([instruments[0]]);

  const audioContext = useRef(new window.AudioContext());

  const onKeyDown = (key : KeyboardEvent) => {
    if (key.key == " ") {

    }
  };


  return (
    <Provider store={store}>
        <div style={styles()}>
            <div style={musicStyles()}>
                <InstrumentSelect onClick={setInstrument} setLoadedPanels={setLoadedPanels}/>

                        <AudioContextProvider value={audioContext}>
                            <MusicDisplay loadedPanels={loadedPanels} activeInstrument={instruments[instrument]} />
                        </AudioContextProvider>
                    <OptionsMenu />
            </div>
            <PlayButton />
        </div>
     </Provider>
  );
}

export default App;


