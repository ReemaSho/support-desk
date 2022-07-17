import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";

//@desc   get notes for a ticket
//@route   GET /api/tickets/:ticketId/notes
//@access  Private
const getNotes = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const { ticketId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error("ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const notes = await Note.find({ ticket: ticketId });

    res.status(200).send(notes);
});

//@desc   add notes for a ticket
//@route   Post /api/tickets/:ticketId/notes
//@access  Private
const addNote = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const { ticketId } = req.params;
    const { text } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }
    if (!text) {
        res.status(400);
        throw new Error("Please add a text");
    }
    const note = await Note.create({
        user: userId,
        ticket: ticketId,
        text: text,
        isStaff: false,
    });

    res.status(200).send(note);
});

export { getNotes, addNote };