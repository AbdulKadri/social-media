import mongoose from "mongoose";

// SCHEMA
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,   // First name
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,   // Last name
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,   // Email address
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,   // Hashed password
        required: true,
        min: 6
    },
    picturePath: {
        type: String,   // Path to the profile picture
        default: ""
    },
    friends: {
        type: Array,    // Array of user ids
        default: []
    },
    location: {
        type: String,   // City, State, Country
    },
    occupation: {
        type: String,   // Student, Teacher, etc.
    },
    viewedProfile: {
        type: Number,   // Number of times the profile has been viewed
    },
    impressions: {
        type: Number,   // Number of times the profile has been viewed
    },
}, { timestamps: true });   // To get the createdAt and updatedAt timestamps

// MODEL
const User = mongoose.model("User", UserSchema); // Creating the model

// EXPORT
export default User; // Exporting the model