import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation
        } = req.body; // Getting the request body

        const salt = await bcrypt.genSalt(10); // To generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // To hash the password

        const picturePath = req.file ? `${req.file.filename}` : ""; // To get the picture path

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        }); // To create a new user

        res.status(201).json(newUser); // To send the response
    } catch (error) {
        res.status(500).json({ error: error.message }); // To send the response
    }
}; // To register a user

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Getting the request body

        const user = await User.findOne({ email }); // To find a user
        if (!user) {
            return res.status(400).json({ message: "User not found!" }); // To send the response
        }

        const validPassword = await bcrypt.compare(password, user.password); // To compare the passwords
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials!" }); // To send the response
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" }); // To create a token
        delete user.password; // To delete the password from the user object

        res.status(200).json({ user, token }); // To send the response
    } catch (error) {
        res.status(500).json({ error: error.message }); // To send the response
    }
}