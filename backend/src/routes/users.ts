import express from "express";
import { verifyTokenUser } from "../middlewares/auth";
import { getCurrentUser } from "../controllers/user";

const router = express.Router();

router.get("/me", verifyTokenUser, getCurrentUser);

export default router;
