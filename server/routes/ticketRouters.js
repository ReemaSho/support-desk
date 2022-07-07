import express from "express";
import { getTicket, createTicket } from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTicket).post(protect, createTicket);

export default router;