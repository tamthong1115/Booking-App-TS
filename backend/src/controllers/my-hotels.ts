import { RequestHandler } from "express";
import cloudinary, { UploadApiResponse } from "cloudinary";
import ExpressError from "../utils/ExpressError";
import Hotel from "../models/hotel";
import { HotelType } from "../../shared/types";

export const postNewHotel: RequestHandler = async (req, res, next) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    /*
    wasted resources
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      // console.log(dataURI);
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    */
    const uploadPromises = imageFiles.map(async (image) => {
      const uploadResult = await new Promise<UploadApiResponse | undefined>(
        (resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream(
              { resource_type: "image", folder: "/hotels" },
              (error, uploadResult) => {
                if (error) {
                  reject(error);
                }
                return resolve(uploadResult);
              }
            )
            .end(image.buffer);
        }
      );
      if (uploadResult) {
        return uploadResult.url;
      } else {
        throw new Error("Upload failed!");
      }
    });

    const imageUrls = await Promise.all(uploadPromises);
    // add urls image to hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    /*
     take id from req.userId (not req.body) b.c the 
     userId has validate by token before add it to req
    */
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (e) {
    console.log(e);
    next(new ExpressError(`Error creating hotel: ${e}`, 400));
  }
};

export const getHotels: RequestHandler = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    console.log(error);
    next(new ExpressError(`Error creating hotel: ${error}`, 500));
  }
};
