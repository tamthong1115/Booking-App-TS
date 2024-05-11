export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    gender?: string;
    birthday?: Date;
    nationality?: string;
    isAdmin: boolean;
};

export interface RoomType {
    _id: string;
    name: string;
    roomType: string;
    description: string;
    pricePerNight: number;
    isBooked: boolean;
}

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
    bookings: BookingType[];
    reviews: string[];
    rooms?: RoomType[];
}

export interface BookingType {
    _id: string;
    roomId: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
}

export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
};

export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalCost: number;
};

export type ReviewType = {
    _id: string;
    userId: string;
    userName: string;
    hotelId: string;
    rating: number;
    comment: string;
};
