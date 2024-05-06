import express, {Request, Response} from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./src/routes/users";
import authRoutes from "./src/routes/auth";
import myHotelRoutes from "./src/routes/my-hotels";
import cookieParser from "cookie-parser";
import connectToDatabase from "./src/utils/connectToDatabase";
import {v2 as cloudinary} from "cloudinary";
import hotelRoutes from "./src/routes/hotels"
import ExpressHandler from "./src/middlewares/ExpressHandler";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectToDatabase();

const app = express();
app.use(cookieParser());

// parse incoming JSON req
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// allow req from another port
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // only accept url from frontend
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use('/api/hotels', hotelRoutes)


app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Error handling middleware
app.use(ExpressHandler);

app.listen(8080, () => {
    console.log(`Server running on http://localhost:${8080}`);
});


