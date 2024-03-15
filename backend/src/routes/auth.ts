import express, { Request, Response } from "express";
import validateRequest from "../validation/middlewares/schemaValidator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {getValidateToken, postLogin, postLogout, postRegister} from "../controllers/auth";
import  verifyToken  from "../middlewares/auth";

const router = express.Router();

router.post("/login", postLogin);
router.post("/register", validateRequest, postRegister);

router.get("/validate-token", verifyToken, getValidateToken)

router.post("/logout",postLogout )
export default router;
