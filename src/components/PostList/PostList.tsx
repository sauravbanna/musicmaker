import SongPreview from "../SongPreview/SongPreview"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import IPostListProps from "./PostListInterface"

const PostList = ({name, posts, justify, fullWidth} : IPostListProps) => {
    return (
        <>
            {name ?
                <>
                <div
                    style=
                            {
                                {
                                    alignItems: "flex-start",
                                    display: "flex",
                                    flexDirection: "row",
                                    minWidth: "100%"
                                }
                            }
                >
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Typography
                        variant="h4"
                    >
                        {name}
                    </Typography>
                </div>
                <div>&nbsp;</div>
                </>
                : null
            }
            <div
                style=
                        {
                            {
                                minWidth: "100%",
                                justifyContent: justify,
                                display: "flex"
                            }
                        }
            >
                <Stack
                    spacing={2}
                    sx={
                            {
                                minWidth: fullWidth ? "100%" : "80%"
                            }
                        }
                >
                    {posts.map((ele : any, i: number) => {
                        return (
                            <SongPreview
                                title="Song1"
                                date="10 months ago"
                                author="User1"
                                duration="10:00"
                                id={1002}
                                image="../../assets/download.png"
                                likes={0}
                                comments={0}
                                index={i}
                             />
                        );
                    })}
                </Stack>
            </div>
        </>
    );
}

export default PostList