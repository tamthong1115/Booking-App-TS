import express from "express";
import { authenticationAdmin } from "../middlewares/auth";
import { addNewRoom, getRooms } from "../controllers/rooms";

const router = express.Router();

router.get("/:hotelId", getRooms);

// /api/hotels/:hotelId/rooms
router.post("/", authenticationAdmin, addNewRoom);

export default router;
