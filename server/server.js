import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.listen(PORT, console.log(`Server started at port ${PORT}`));