import express from "express";
import {
  getValidateToken,
  getVerifyEmail,
  postForgetPassword,
  postLogin,
  postLogout,
  postRegister,
  postResetPassword,
} from "../controllers/auth";
import { authenticationAdmin, verifyTokenUser } from "../middlewares/auth";
import {
  loginValidator,
  registerValidator,
} from "./validation/schemas/authSchemas";

const router = express.Router();

router.post("/login", loginValidator, postLogin);
router.post("/register", registerValidator, postRegister);
router.get("/verify-email/:token", getVerifyEmail);

router.post("/forget-password", postForgetPassword)
router.post("/reset-password", postResetPassword)

router.get("/validate-token", verifyTokenUser, getValidateToken);

router.get(
  "/validate-token-admin",
  verifyTokenUser,
  authenticationAdmin,
  getValidateToken
);

router.post("/logout", postLogout);

export default router;
