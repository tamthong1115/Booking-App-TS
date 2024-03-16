import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
// import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import connectToDatabase from "./utils/connectToDatabase";

connectToDatabase();

const app = express();
app.use(cookieParser());

// parse incoming JSON req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allow req from another port
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // only accept url from frontend
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

app.listen(8080, () => {
  console.log(`Server running on http://localhost:${8080}`);
});
