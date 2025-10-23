import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ 
        message: "No token provided" 
    });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decode is: ", decoded)
        req.user = await User.findById(decoded?.id).select("-password");

        console.log("Inside protect middleware: -> ", req.user)
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Access denied" 
            });
        }
        next();
    };
};
