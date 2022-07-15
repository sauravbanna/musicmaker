export const INSTRUMENTS = ["Piano", "Drums", "Guitar", "Bass", "Saxophone"];
export const NOTES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const PLAYHEAD_ID = "Playhead"
export const INSTRUMENT_SELECT_ID = "InstrumentSelect"
export const NOTE_ID = "Note"

export const KEY_ID = "Key"
export const NOTE_INFO_LEFT_KEY = "left"
export const NOTE_INFO_RIGHT_KEY = "right"

export const PLAYTIME = 4;
export const FRAMERATE = 4;

export const KEY_FADE_IN_LENGTH = 1.5;

export const ADD_NOTE = 'addNote'
export const REMOVE_NOTE = 'removeNote'
export const EDIT_NOTE = 'editNote'
export const IMPORT_NOTES = 'importNotes'

export const KEY_EVEN_COLOR = "gainsboro"
export const KEY_ODD_COLOR = "white"
export const NOTE_COLOR = "#f7b36f"
export const NOTE_SELECT_COLOR = "#588758"
export const HEIGHT = "45vh"
export const WIDTH = "60vh"
export const BORDER_RADIUS = "1em"


export function notesSelectors(instrument : string) {
    if (instrument.toLowerCase() == "drums") {
        return ["Kick", "Snare", "FloorTom", "HiHat", "CrashCymbal", "HighTom", "MediumTom", "RideCymbal", "Cowbell", "Tabla", "Tambourine", "Conga"];
    } else {
        return ["C", "CSharp", "D", "DSharp", "E", "F", "FSharp", "G", "GSharp", "A", "ASharp", "B"];
    }
}