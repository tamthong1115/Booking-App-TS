import { RequestHandler } from "express";
import CustomError from "../utils/ExpressError";
import Hotel from "../models/hotel";
import { BookingType, HotelType } from "../../shared/types";

export const getBookings: RequestHandler = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({}).populate<{ bookings: BookingType[] }>({
      path: "bookings",
      match: {
        userId: req.userId,
      },
    });

   

    const result = hotels.map((hotel) => {
      console.log(hotel.bookings)
      const userBookings = hotel.bookings?.filter(
        (booking) => booking.userId === req.userId
      );

      // Sort the bookings by check-out date in descending order
      userBookings?.sort(
        (a, b) =>
          new Date(a.checkOut).getTime() - new Date(b.checkOut).getTime()
      );

      const hotelWithUserBookings = {
        ...hotel.toObject(),
        bookings: userBookings, // Only return the bookings that match the user ID
      };

      return hotelWithUserBookings;
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(new CustomError("Failed to get bookings", 500));
  }
};


