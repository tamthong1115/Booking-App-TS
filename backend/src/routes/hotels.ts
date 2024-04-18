import express from "express";
import { searchHotels } from "../controllers/hotels";

const router = express.Router();

// /api/hotels/search?
router.get("/search", searchHotels);

export default router;

