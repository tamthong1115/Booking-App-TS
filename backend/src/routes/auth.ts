import express from "express";
import {
  getValidateToken,
  postLogin,
  postLogout,
  postRegister,
} from "../controllers/auth";
import { authenticationAdmin, verifyTokenUser } from "../middlewares/auth";
import {
  loginValidator,
  registerValidator,
} from "./validation/schemas/authSchemas";

const router = express.Router();

router.post("/login", loginValidator, postLogin);
router.post("/register", registerValidator, postRegister);

router.get("/validate-token", verifyTokenUser, getValidateToken);

router.get("/validate-token-admin",verifyTokenUser, authenticationAdmin, getValidateToken);

router.post("/logout", postLogout);

export default router;
