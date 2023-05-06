import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router(); // To create a router

router.post("/login", login); // To login a user

export default router; // To export the router