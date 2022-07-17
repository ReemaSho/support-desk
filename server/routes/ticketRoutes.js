import express from "express";
import {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
} from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";
import noteRouter from "./noteRoutes.js";

const router = express.Router();

// re-route into noteRouter
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
    .route("/:id")
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket);

export default router;