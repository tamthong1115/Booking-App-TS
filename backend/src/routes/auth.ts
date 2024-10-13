import express from "express";
import {
  getRoles,
  getValidateToken,
  getVerifyEmail,
  postForgetPassword,
  postLogin,
  postLogout,
  postRegister,
  postResetPassword,
} from "../controllers/auth";
import verifyTokenUser from "../middlewares/verifyTokenUser";
import roleMiddleware from "../middlewares/roleMiddleware";
import {
  loginValidator,
  registerValidator,
} from "./validation/schemas/authSchemas";

const router = express.Router();

// /api/auth/login
router.post("/login", loginValidator, postLogin);
router.post("/register", registerValidator, postRegister);
router.get("/verify-email/:token", getVerifyEmail);

router.post("/forget-password", postForgetPassword);
router.post("/reset-password", postResetPassword);

router.get("/validate-token", verifyTokenUser, getValidateToken);

router.get("/roles", verifyTokenUser, getRoles);

router.get(
  "/validate-token-role/:role",
  verifyTokenUser,
  (req, res, next) => roleMiddleware([req.params.role])(req, res, next),
  getValidateToken
);

router.post("/logout", postLogout);

export default router;
