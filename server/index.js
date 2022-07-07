import express from "express";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

//connect to database
connectDB();

// set up the app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Desk API" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
// middleware
app.use(errorHandler);

//
app.listen(PORT, console.log(`Server started at port ${PORT}`));