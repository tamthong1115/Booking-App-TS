import mongoose from "mongoose";
import { BookingType, HotelType } from "../../shared/types";
import Review from "./review";

const bookingSchema = new mongoose.Schema<BookingType>({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalCost: { type: Number, required: true },
});

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imagePublicIds: [{ type: String, required: true }],
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

// delete all reviews associated with a hotel
hotelSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
