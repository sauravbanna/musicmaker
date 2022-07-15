import Stack from "@mui/material/Stack"
import SongPreviewMini from "../../../../components/SongPreview/Mini/SongPreviewMini"

const LikedSongs = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    return (
        <Stack>
            {array.map((ele: number) => {
                return (
                    <SongPreviewMini id={ele} title="song" author="user3" duration="10:00" image="l"/>
                );
            })}
        </Stack>
    );
}

export default LikedSongs