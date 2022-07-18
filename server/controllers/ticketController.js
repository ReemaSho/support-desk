import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";

//@desc   get user tickets
//@route   GET /api/tickets
//@access  Private
const getTickets = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const tickets = await Ticket.find({ user: userId });
    if (!tickets) {
        res.status(404);
        throw new Error("No tickets found");
    }
    res.status(200).send(tickets);
});

//@desc   get user ticket
//@route   GET /api/tickets/:id
//@access  Private
const getTicket = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const { id: ticketId } = req.params;
    // check user
    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    // find ticket
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    // check if ticket belongs to the user from JWT
    if (ticket.user.toString() !== userId) {
        res.status(401);
        throw new Error("Not authorized");
    }

    res.status(200).send(ticket);
});

//@desc   create ticket
//@route   POST /api/tickets
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

//@desc   delete user ticket
//@route   DELETE /api/tickets/:id
//@access  Private
const deleteTicket = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const { id: ticketId } = req.params;
    // check user
    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    // find ticket
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    // check if ticket belongs to the user from JWT
    if (ticket.user.toString() !== userId) {
        res.status(401);
        throw new Error("Not authorized");
    }
    await ticket.remove();

    res.status(200).send({ success: true });
});

//@desc   update user ticket
//@route   PUT /api/tickets/:id
//@access  Private
const updateTicket = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const { id: ticketId } = req.params;
    // check user
    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    // find ticket
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    //check if ticket belongs to the user from JWT
    if (ticket.user.toString() !== userId) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
        new: true,
    });

    return res.status(200).send(updatedTicket);
});
export { getTickets, getTicket, createTicket, deleteTicket, updateTicket };