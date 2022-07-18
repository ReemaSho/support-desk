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

//@desc   delete  ticket's note
//@route   DELETE  /api/tickets/:ticketId/notes/:noteId
//@access  Private
const deleteNote = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const { ticketId, noteId } = req.params;

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

    const note = await Note.findById(noteId);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    await note.deleteOne();

    res.status(200).send({ success: true });
});

//@desc   update ticket's note
//@route   PUT /api/tickets/:ticketId/notes/:noteId
//@access  Private
const updateNote = asyncHandler(async(req, res) => {
    const { id: userId } = req.user;
    const { ticketId, noteId } = req.params;

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

    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
        new: true,
    });
    if (!updatedNote) {
        res.status(404);
        throw new Error("Note not found");
    }
    return res.status(200).send(updatedNote);
});

export { getNotes, addNote, deleteNote, updateNote };