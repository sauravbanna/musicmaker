import {MemoKey} from "../Key/Key"
import {styles} from "./KeysStyle"
import {useState, memo} from 'react'
import {notesSelectors} from '../../store/constants'
import KeysProps from './KeysInterface'

function Keys({progress, instrument, active} : KeysProps) {
    return (
        <div style={styles(active)}>
            {notesSelectors(instrument).map((ele, i) => {
                return (
                    <MemoKey
                        instrument={instrument}
                        note={i}
                        progress={progress}
                        key={`${instrument}_Key_${ele}`}
                        id={`${instrument}_Key_${ele}`}
                        grey={i % 2 == 0}/>
                );
            })}
        </div>
    );
}

export const MemoKeys = memo(Keys);