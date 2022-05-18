import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
//@desc    Register a new user
//@route   /api/user
//@access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        const newUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        };

        res.status(201).json({
            success: true,
            user: {...newUser },
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc    Login a user
//@route   /api/user/login
//@access  Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }
    const existUser = await User.findOne({ email });
    if (existUser && (await bcrypt.compare(password, existUser.password))) {
        const user = {
            _id: existUser._id,
            name: existUser.name,
            email: existUser.email,
            token: generateToken(existUser._id),
        };
        res.status(200).json({
            success: true,
            user,
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

// jWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
export { registerUser, loginUser };