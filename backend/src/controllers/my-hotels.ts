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
    const imageUploadResults = await uploadImages(imageFiles, newHotel.name);
    // add urls image to hotel
    newHotel.imageUrls = imageUploadResults.map((result) => result.secure_url);
    newHotel.imagePublicIds = imageUploadResults.map(
      (result) => result.publicId
    );
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

export const getOneHotel: RequestHandler = async (req, res) => {
  const hotelId = req.params.hotelId.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: hotelId,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

export const editHotel: RequestHandler = async (req, res, next) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    // console.log(updatedHotel);
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId.toString(),
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(200).json({ message: "Hotel not found" });
    }

    //add new file from user
    const files = req.files as Express.Multer.File[];
    const imageUploadResults = await uploadImages(files, hotel.name);

    const updatedImageUrls = imageUploadResults.map(
      (result) => result.secure_url
    );
    const updatedImagePublicIds = imageUploadResults.map(
      (result) => result.publicId
    );

    const deletedImages = hotel.imagePublicIds.filter(
      (publicId) => !updatedImagePublicIds.includes(publicId)
    );

    console.log(hotel.imagePublicIds);
    console.log(updatedImagePublicIds);
    console.log(updatedImageUrls);
    console.log(deletedImages);

    deletedImages.forEach((publicId) => {
      cloudinary.v2.uploader.destroy(publicId, function (error, result) {
        if (error) {
          console.error("Error deleting image:", error);
        } else {
          console.log("Image deleted:", result);
        }
      });
    });

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    next(new ExpressError(`Error updating hotel: ${error}`, 500));
  }
};

export const deleteHotel: RequestHandler = async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndDelete({
      _id: req.params.hotelId,
      userId: req.userId,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Delete images from Cloudinary
    cloudinary.v2.api.delete_resources(
      hotel.imagePublicIds,
      function (error, result) {
        if (error) {
          console.error("Error deleting images:", error);
        } else {
          console.log("Images deleted:", result);
        }
      }
    );

    res.status(200).json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hotel" });
  }
};

async function uploadImages(
  imageFiles: Express.Multer.File[],
  hotelName?: string
) {
  const uploadPromises = imageFiles.map(async (image) => {
    const uploadResult = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            { resource_type: "image", folder: `/hotels/${hotelName}` },
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
      return {
        secure_url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    } else {
      throw new Error("Upload failed!");
    }
  });

  const imageUploadResults = await Promise.all(uploadPromises);
  return imageUploadResults;
}
