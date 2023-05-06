import User from '../models/User.js';

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; // To get the user id
        const user = await User.findById(id); // To find the user
        res.status(200).json(user); // To send the user
    } catch (err) {
        res.status(404).json({ message: err.message }); // To send the error
    }
}; // To get a user

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params; // To get the user id
        const user = await User.findById(id); // To find the user

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); // To get the user's friends

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        ); // To format the user's friends

        res.status(200).json(formattedFriends); // To send the user's friends

    } catch (err) {
        res.status(404).json({ message: err.message }); // To send the error
    }
}; // To get a user's friends

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params; // To get the user id and friend id
        const user = await User.findById(id); // To find the user
        const friend = await User.findById(friendId); // To find the friend

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId); // To remove the friend
            friend.friends = friend.friends.filter((id) => id !== id); // To remove the user
        } else {
            user.friends.push(friendId); // To add the friend
            friend.friends.push(id); // To add the user
        } // To add/remove a friend

        await user.save(); // To save the user
        await friend.save(); // To save the friend

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); // To get the user's friends

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        ); // To format the user's friends

        res.status(200).json(formattedFriends); // To send the user's friends

    } catch (err) {
        res.status(404).json({ message: err.message }); // To send the error
    }
}; // To add/remove a friend
