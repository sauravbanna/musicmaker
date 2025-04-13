import SongPreview from "../SongPreview/SongPreview"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import IPostListProps from "./PostListInterface"
import useGetLikedTracks from "../../hooks/useGetLikedTracks"

const PostList = ({name, posts, justify, fullWidth} : IPostListProps) => {
    const likedTracks = useGetLikedTracks();

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
                                trackId={ele.trackId}
                                title={ele.title}
                                date={ele.date}
                                author={ele.name}
                                duration="10:00"
                                authorId={ele.id}
                                image={ele.image}
                                likes={ele.likes}
                                comments={ele.comments}
                                index={i}
                                liked={likedTracks.includes(ele.trackId)}
                             />
                        );
                    })}
                </Stack>
            </div>
        </>
    );
}

export default PostList