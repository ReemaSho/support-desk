import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
//@desc    Register a new user
//@route   /api/users
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
    const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (createdUser) {
        const user = {
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser._id),
        };

        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc    Login a user
//@route   /api/users/login
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
        res.status(200).json(user);
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

//@desc Get current user
//@route   /api/users/me
//@access  Private
const getMe = asyncHandler(async(req, res) => {
    const { _id: id, email, name } = req.user;
    const user = {
        id,
        email,
        name,
    };
    res.status(200).send(user);
});
// jWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
export { registerUser, loginUser, getMe };