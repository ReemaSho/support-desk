import asyncHandler from "express-async-handler";

import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";

//@desc   get user tickets
//@route   Get /api/tickets
//@access  Private
const getTickets = asyncHandler(async(req, res) => {
    res.status(200).send({ message: "get tickets" });
});

//@desc   create ticket
//@route   Post /api/tickets
//@access  Private
const createTicket = asyncHandler(async(req, res) => {
    res.status(200).send({ message: "create tickets" });
});

export { getTickets, createTicket };