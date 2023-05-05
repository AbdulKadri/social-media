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

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url); // To get the current file name
const __dirname = path.dirname(__filename); // To get the current directory name

dotenv.config(); // To use .env file
const app = express(); // Initializing express

// MIDDLEWARES
app.use(express.json); // To parse the request body

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

// DATABASE CONNECTION
const PORT = process.env.PORT || 6001; // To get the port number
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(`${error} did not connect`);
}); // To connect to the database