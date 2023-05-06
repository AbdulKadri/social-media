import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
}; // initial states

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }, // setMode reducer function to toggle between light and dark mode
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }, // setLogin reducer function to set user and token
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        }, // setLogout reducer function to set user and token to null
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("User friends non-existent")
            }
        }, // setFriends reducer function to set user friends
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        }, // setPosts reducer function to set posts
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            }); // map through posts and update the post that was edited
            state.posts = updatedPosts;
        } // setPost reducer function to set post
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;