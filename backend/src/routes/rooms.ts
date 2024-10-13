import express from "express";
import { addNewRoom, getRooms } from "../controllers/rooms";
import roleMiddleware from "../middlewares/roleMiddleware";
const router = express.Router();

router.get("/:hotelId", getRooms);

// /api/hotels/:hotelId/rooms
router.post("/", roleMiddleware(["admin"]), addNewRoom);

export default router;
