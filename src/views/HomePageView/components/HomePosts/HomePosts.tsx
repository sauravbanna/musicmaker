import PostList from "../../../../components/PostList/PostList"

const HomePosts = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    return (
        <PostList name="" posts={array} justify="flex-start" fullWidth={true}/>
    );
}

export default HomePosts