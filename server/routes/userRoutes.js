import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router(); // To create a router

// READ
router.get("/:id", verifyToken, getUser); // To get a user
router.get("/:id/friends", verifyToken, getUserFriends); // To get a user's friends

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); // To add/remove a friend

export default router; // To export the router