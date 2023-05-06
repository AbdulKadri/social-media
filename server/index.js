import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import { register } from "./controllers/authController.js"
import { verifyToken } from "./middleware/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { createPost } from "./controllers/postController.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url); // To get the current file name
const __dirname = path.dirname(__filename); // To get the current directory name

dotenv.config(); // To use .env file
const app = express(); // Initializing express

// MIDDLEWARES
app.use(express.json()); // To parse the request body

app.use(helmet()); // To secure the app
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // To secure the app

app.use(morgan("common")); // To log the requests

app.use(bodyParser.json({ limit: "30mb", extended: true })); // To parse the request body
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // To parse the request body

app.use(cors()); // To allow cross origin requests
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // To serve static files

// FILE STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
}); // To store files
const upload = multer({ storage }); // To store files

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register); // To register a user
app.post("/posts", verifyToken, upload.single("picture"), createPost); // To create a post

// ROUTES
app.use("/auth", authRoutes); // To use the auth routes
app.use("/users", userRoutes); // To use the user routes
app.use("/posts", postRoutes); // To use the post routes

// DATABASE CONNECTION
const PORT = process.env.PORT || 6001; // To get the port number
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    // Add fake users and posts to the database One time when needed
    // User.insertMany(users)
    // Post.insertMany(posts)
}).catch((error) => {
    console.log(`${error} did not connect`);
}); // To connect to the database