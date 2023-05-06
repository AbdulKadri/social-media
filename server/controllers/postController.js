import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body; // To get the user id, description, and picture path
        const user = await User.findById(userId); // To find the user

        const newPost = await Post.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        }); // To create a new post

        const posts = await Post.find({}); // To find all posts
        res.status(201).json(posts); // To send all posts

    } catch (err) {
        res.status(409).json({ message: err.message }); // To send the error
    }
}; // To create a post

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find({}); // To find all posts
        res.status(200).json(posts); // To send all posts
    } catch (err) {
        res.status(404).json({ message: err.message }); // To send the error
    }
}; // To get all posts

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params; // To get the user id
        const posts = await Post.find({ userId }); // To find the user's posts
        res.status(200).json(posts); // To send the user's posts
    } catch (err) {
        res.status(404).json({ message: err.message }); // To send the error
    }
}; // To get a user's posts

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params; // To get the post id
        const { userId } = req.body; // To get the user id
        const post = await Post.findById(id); // To find the post

        if (post.likes.get(userId)) {
            post.likes.delete(userId); // To remove the like
        } else {
            post.likes.set(userId, true); // To add the like
        } // To add/remove a like

        const updatedPost = await findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        ); // To update the post

        res.status(200).json(updatedPost); // To send the updated post

    } catch (err) {
        res.status(409).json({ message: err.message }); // To send the error
    }
}; // To like a post