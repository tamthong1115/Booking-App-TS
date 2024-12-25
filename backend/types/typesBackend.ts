import { Schema } from "mongoose";

export interface HotelType {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    location: {
        type: string;
        coordinates: number[];
    };
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    starRating: number;
    imagePublicIds: string[];
    imageUrls: string[];
    lastUpdated: Date;
    bookings: Schema.Types.ObjectId[];
    reviews: string[];
    rooms?: Schema.Types.ObjectId[];
}
