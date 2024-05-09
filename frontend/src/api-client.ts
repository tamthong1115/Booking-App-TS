import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
    HotelSearchResponse,
    HotelType,
    PaymentIntentResponse,
    ReviewType,
    UserType,
} from "../../backend/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

// if the backend and frontend bundles just use the same server to fetch
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching user");
    }
    return response.json();
};

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
};

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
};

export const validateTokenUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include", // send any cookies along with req
    });

    if (!response.ok) {
        throw new Error("Token Invalid");
    }
    return response.json();
};

export const validateTokenAdmin = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token-admin`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Token Invalid");
    }
    return response.json();
};

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Error during sign out!");
    }
};

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Error during add hotel!");
    }

    return response.json();
};

// admin
export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
};

// public
export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
};
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Update hotel failed");
    }

    return response.json();
};

export const deleteHotelById = async (hotelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error deleting hotel");
    }
};

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));

    searchParams.types?.forEach((type) => queryParams.append("types", type));

    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error fetching hotels!");
    }

    return response.json();
};

export const fetchHotelById = async (hotelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if (!response.ok) {
        throw new Error("Error fetching hotel");
    }

    return response.json();
};

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error creating payment intent");
    }

    return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error("Error creating booking");
    }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        credentials: "include",
    });

    if (!response) {
        throw new Error("Unable to fetch bookings");
    }

    return response.json();
};

export const postNewReview = async (formData: ReviewType) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};

export const getReviews = async (hotelId: string): Promise<ReviewType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/reviews`);

    if (!response.ok) {
        throw new Error("Error fetching reviews");
    }

    return response.json();
};

export const deleteReview = async (hotelId: string, reviewId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = (await response.json()) || "Error deleting review";
        throw new Error(errorData.message);
    }
};
