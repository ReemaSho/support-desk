import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";

//@desc   get user tickets
//@route   Get /api/tickets
//@access  Private
const getTickets = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const tickets = await Ticket.find({ user: userId });
    res.status(200).send(tickets);
});

//@desc   create ticket
//@route   Post /api/tickets
//@access  Private
const createTicket = asyncHandler(async(req, res) => {
    const { product, description } = req.body;
    const { id: userId } = req.user;
    // check properties
    if (!product || !description) {
        res.status(400);
        throw new Error("please add product's name and description");
    }

    // get the user
    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    const ticket = await Ticket.create({
        user: userId,
        product,
        description,
        status: "new",
    });
    res.status(201).send(ticket);
});

export { getTickets, createTicket };