import {memo} from 'react'
import {styles} from "./MarkersStyle"

function Markers(props : any) {
    const arr = [1, 2, 3, 4]
    const minWidth = 100 / arr.length;

    return (
        <div style={styles()}>
            {arr.map((ele, id) => {
                return (
                    <div className="marker" style={{minWidth: `${minWidth}%`, opacity: id % 2 == 0 ? "0%" : "20%"}} key={`Marker_${ele}`}></div>
                );
            })}
        </div>
    );
}

export const MemoMarkers = memo(Markers);