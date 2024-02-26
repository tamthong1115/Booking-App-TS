import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

// parse incoming JSON req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow req from another port
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello from express" });
});

app.listen(8080, () => {
  console.log(`Server running on http://localhost:${8080}`);
});
