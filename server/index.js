import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8000;

//connect to database
connectDB();

// set up the app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

//serve client
if (process.env.NODE_ENV === "production") {
    //set build folder as static
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "../client/build/index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome to Support Desk API" });
    });
}

// middleware
app.use(errorHandler);

//
app.listen(PORT, console.log(`Server started at port ${PORT}`));