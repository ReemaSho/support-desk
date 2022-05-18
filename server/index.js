import express from "express";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Desk API" });
});

// Routes
app.use("/api/users", userRoutes);
app.use(errorHandler);
app.listen(PORT, console.log(`Server started at port ${PORT}`));