export default interface NoteProps {
    id: string,
    left: number,
    right: number,
    progress: number,
    setPlayNote: (playNote : boolean) => void,
    removeNote: Function,
    moveNote: Function,
    readOnly: boolean
}




