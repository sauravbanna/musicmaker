import {INSTRUMENTS as instruments, INSTRUMENT_SELECT_ID} from "../../../utils/constants"
import {ButtonGroup, Button} from '@mui/material'
import {useState, useEffect} from 'react'
import {styles} from "./InstrumentSelectStyles"
import AppButton from "../../../../../components/AppButton/AppButton"
import InstrumentSelectProps from "./InstrumentSelectInterface"

const InstrumentSelect = ({onClick, setLoadedPanels} : InstrumentSelectProps) => {
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        onClick(activeButton);
        setLoadedPanels((prev : Array<string>) => [...new Set([...prev, instruments[activeButton]])]);
    }, [activeButton]);

    return (
        <div id={INSTRUMENT_SELECT_ID}>
            {instruments.map((ele, id) => {
                return(
                    <AppButton
                        key={`${INSTRUMENT_SELECT_ID}_${ele}`}
                        name={ele}
                        extraStyles={styles(activeButton == id)}
                        disableRipple={true}
                        disableHover={true}
                        onClick={() => {
                            return setActiveButton(id);
                        }}>
                    </AppButton>
                );
            })}
        </div>
    );

}

export default InstrumentSelect