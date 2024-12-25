import express from "express";
import verifyTokenUser from "../middlewares/verifyTokenUser";
import { getCurrentUser, updateUser } from "../controllers/user";

const router = express.Router();

router.get("/me", verifyTokenUser, getCurrentUser);

router.put("/me", verifyTokenUser, updateUser);

export default router;
