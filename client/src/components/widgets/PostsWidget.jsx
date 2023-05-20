import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch(); // dispatch actions
    const posts = useSelector((state) => state.posts); // get posts from state
    const token = useSelector((state) => state.token); // get token from state

    // grab all the posts for the homepage
    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }); // get posts from server
        const data = await response.json(); // convert response to json
        dispatch(setPosts({ posts: data })); // dispatch action to set posts
    };

    // grab all the posts from user for the profile page
    const getUserPosts = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        ); // get posts from server
        const data = await response.json(); // convert response to json
        dispatch(setPosts({ posts: data })); // dispatch action to set posts
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;