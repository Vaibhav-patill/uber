const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authUser = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    const isblacklisted = await userModel.findOne({ token });
    if (isblacklisted) {
        return res.status(401).json({ message: "Token is blacklisted, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user; // Attach user to request object
        return next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}

module.exports ={authUser}