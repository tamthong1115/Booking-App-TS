import express from "express";
import { postNewContactUs } from "../controllers/email";

const router = express.Router();

// /api/email/contact-us
router.post("/contact-us", postNewContactUs);

export default router;
