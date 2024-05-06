import express from "express";
import {
  getHotelById,
  postBooking,
  postCreatePaymentIntent,
  searchHotels,
} from "../controllers/hotels";
import { param } from "express-validator";
import { verifyTokenUser } from "../middlewares/auth";

const router = express.Router();

// /api/hotels/search?
router.get("/search", searchHotels);

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotelById
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyTokenUser,
  postCreatePaymentIntent
);

router.post("/:hotelId/bookings", verifyTokenUser, postBooking);

export default router;
