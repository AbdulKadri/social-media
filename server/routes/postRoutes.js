import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router(); // To create a router

// READ
router.get("/", verifyToken, getFeedPosts); // To get all posts
router.get("/:userId/posts", verifyToken, getUserPosts); // To get a user's posts

// UPDATE
router.patch("/:id/like", verifyToken, likePost); // To like a post

export default router; // To export the router
