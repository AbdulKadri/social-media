import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization"); // To get the token from the headers

        if (!token) {
            return res.status(401).json({ message: "Access Denied!" }); // To send the response and stop the execution
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); // To remove the Bearer from the token
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // To verify the token
        req.user = verified; // To set the user in the request object

        next(); // To move to the next middleware
    } catch (error) {
        res.status(500).json({ error: error.message }); // To send the response
    }
}; // To verify the token