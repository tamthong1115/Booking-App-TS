import express, { RequestHandler } from "express";
import verifyTokenUser from "../middlewares/verifyTokenUser";
import { getBookings } from "../controllers/booking";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyTokenUser, getBookings);

export default router;
