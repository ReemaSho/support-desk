import express from "express";
import { getTickets, createTicket } from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

export default router;