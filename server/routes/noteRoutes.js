import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    getNotes,
    addNote,
    deleteNote,
    updateNote,
} from "../controllers/noteController.js";
const router = express.Router({ mergeParams: true });
// /api/tickets/:ticketId/notes
router.route("/").get(protect, getNotes).post(protect, addNote);
router.route("/:noteId").delete(protect, deleteNote).put(protect, updateNote);
export default router;