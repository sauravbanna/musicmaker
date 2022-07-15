import {musicAreaStyles, musicDisplayStyles} from "./MusicDisplayStyle"
import {MemoKeys} from "../../music/Keys/Keys"
import {useState, useEffect} from 'react'
import {MemoPlayHead} from "../../control/PlayHead/PlayHead"
import MusicDisplayProps from "./MusicDisplayInterface"

export function MusicDisplay({loadedPanels, activeInstrument} : MusicDisplayProps) {
    const [progress, setProgress] = useState(0);

    return (
        <div style={musicDisplayStyles()}>
            <div style={musicAreaStyles()}>
                {loadedPanels.map((ele, id) => {
                    return (
                        <MemoKeys
                            key={`Keys_${ele}`}
                            progress={progress}
                            instrument={ele}
                            active={ele == activeInstrument}/>
                    );
                })}

                <MemoPlayHead setProgress={setProgress}/>
            </div>
        </div>
    );
}
