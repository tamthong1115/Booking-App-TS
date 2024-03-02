import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  console.log("CONNECTED DATABASE SUCCESSFUL!");
}
main().catch((err) => console.log(err));

const app = express();

// parse incoming JSON req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allow req from another port
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8080, () => {
  console.log(`Server running on http://localhost:${8080}`);
});
