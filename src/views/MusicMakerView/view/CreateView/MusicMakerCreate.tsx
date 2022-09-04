import UploadButton from "../../components/UploadButton/UploadButton"
import MusicMaker from "../../components/ui/MusicMaker/MusicMaker"
import styles from "../MusicMakerViewStyle"


const MusicMakerCreate = () => {

  return (
    <div style={styles()}>
        &nbsp;
        <MusicMaker readOnly={false}/>
        <UploadButton />
    </div>
  );
}

export default MusicMakerCreate;


