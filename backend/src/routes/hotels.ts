import express from "express";
import { getHotelById, searchHotels } from "../controllers/hotels";
import { param } from "express-validator";

const router = express.Router();



// /api/hotels/search?
router.get("/search", searchHotels);

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotelById
);


export default router;
