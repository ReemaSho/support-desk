import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Desk API" });
});
app.use("/api/users", userRoutes);
app.listen(PORT, console.log(`Server started at port ${PORT}`));