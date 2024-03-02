import express from "express";
import * as userControllers from "../controllers/user";
import validateRequest from "../validation/middlewares/schemaValidator";
const router = express.Router();

// /api/users/register
router.post("/register", validateRequest, userControllers.postRegister);

export default router;
