import {INSTRUMENTS as instruments} from "../../store/constants"
import {ButtonGroup, Button} from '@mui/material'
import {useState, useEffect} from 'react'
import {styles} from "./InstrumentSelectStyles"
import {INSTRUMENT_SELECT_ID} from "../../store/constants"
import InstrumentSelectProps from "./InstrumentSelectInterface"

export function InstrumentSelect({onClick, setLoadedPanels} : InstrumentSelectProps) {
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        onClick(activeButton);
        setLoadedPanels((prev : Array<string>) => [...new Set([...prev, instruments[activeButton]])]);
    }, [activeButton]);

    return (
        <div id={INSTRUMENT_SELECT_ID}>
            {instruments.map((ele, id) => {
                return(
                    <Button
                        key={`${INSTRUMENT_SELECT_ID}_${ele}`}
                        style={styles(activeButton == id)}
                        onClick={() => {
                            return setActiveButton(id);
                        }}>
                            {ele}
                    </Button>
                );
            })}
        </div>
    );

}