import express from "express";
import {
    deleteHotel,
    editHotel,
    getHotels,
    getOneHotel,
    postNewHotel,
} from "../controllers/my-hotels";
import multer from "multer";
import {authenticationAdmin} from "../middlewares/auth";
import {body} from "express-validator";
// import { hotelValidator } from "./validation/schemas/hotelSchems";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

// api/my-hotels
const MAX_IMG = 6;
router.post(
    "/",
    authenticationAdmin,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight")
            .notEmpty()
            .isNumeric()
            .withMessage("Price per night is required and must be a number"),
        body("facilities")
            .notEmpty()
            .isArray()
            .withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", MAX_IMG),
    postNewHotel
);

router.get("/", authenticationAdmin, getHotels);

router.get("/:hotelId", authenticationAdmin, getOneHotel);

// api/my-hotels/:hotelId
router.put(
    "/:hotelId", // params hotelId
    authenticationAdmin,
    upload.array("imageFiles"),
    editHotel
);

//delete
router.delete("/:hotelId", authenticationAdmin, deleteHotel);

export default router;
