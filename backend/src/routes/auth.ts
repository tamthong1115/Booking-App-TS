import express from "express";
import {
  getValidateToken,
  postLogin,
  postLogout,
  postRegister,
} from "../controllers/auth";
import verifyToken from "../middlewares/auth";
import {
  loginValidator,
  registerValidator,
} from "./validation/schemas/authSchemas";

const router = express.Router();

router.post("/login", loginValidator, postLogin);
router.post("/register", registerValidator, postRegister);

router.get("/validate-token", verifyToken, getValidateToken);

router.post("/logout", postLogout);
export default router;
