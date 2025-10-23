import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { name, email, password, role,  secretKey} = req.body;

        if(!name || !email || !password || !role || !secretKey){
            return res.status(400).json({
                success: false,
                message: "All data required",
            });
        }

        // only "principal" or "student" allowed
        if (!["principal", "student"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (role === "principal") {
            if (secretKey !== process.env.PRINCIPAL_SECRET_KEY) {
                return res.status(403).json({ 
                    message: "Invalid secret key for Principal" 
                });
            }
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All data required",
            });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
