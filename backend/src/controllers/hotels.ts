import {RequestHandler} from "express";
import Hotel from "../models/hotel";
import {BookingType, HotelSearchResponse} from "../../shared/types";
import {validationResult} from "express-validator";
import CustomError from "../utils/ExpressError";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const getHotelById: RequestHandler = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const id = req.params.id.toString();

    try {
        const hotel = await Hotel.findById(id);
        res.json(hotel);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
};

export const searchHotels: RequestHandler = async (req, res) => {
    try {
        const query = constructSearchQuery(req.query);
        // console.log(req.query);
        // console.log(query);
        let sortOption = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOption = {starRating: "desc"};
                break;
            case "pricePerNightAsc":
                sortOption = {pricePerNight: "asc"};
                break;
            case "pricePerNightDesc":
                sortOption = {pricePerNight: "desc"};
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await Hotel.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(pageSize);

        const total = await Hotel.countDocuments(query);

        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.json(response);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "Something went wrong"});
    }
};

export const getHotels: RequestHandler = async (req, res, next) => {
    try {
        const hotels = await Hotel.find().sort("-lastUpdated");
        res.json(hotels);
    } catch (error) {
        console.log(error);
        next(new CustomError("Failed to get hotels", 500));
    }
};

export const postCreatePaymentIntent: RequestHandler = async (req, res) => {
    const {numberOfNights} = req.body;
    const hotelId = req.params.hotelId.toString();

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
        throw new CustomError("Hotel not found", 404);
    }

    const totalCost = hotel.pricePerNight * parseInt(numberOfNights);
    /*
    PaymentIntent is a Stripe object that represents your
    intent to collect payment from a customer, tracking the
    lifecycle of the payment process.
    */
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100, // amount in cents
        currency: "usd",
        metadata: {
            hotelId,
            userId: req.userId,
        },
    });

    // client_secret is a secret key that is used to authenticate the client
    if (!paymentIntent.client_secret) {
        throw new CustomError("Error creating payment intent", 500);
    }

    const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        totalCost: totalCost,
    };

    res.send(response);
};

export const postBooking: RequestHandler = async (req, res, next) => {
    try {
        const paymentIntentId = req.body.paymentIntentId;

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId as string
        );

        if (!paymentIntent) {
            return res.status(400).json({message: "Payment intent not found"});
        }

        if (
            paymentIntent.metadata.hotelId !== req.params.hotelId ||
            paymentIntent.metadata.userId !== req.userId
        ) {
            return res.status(400).json({message: "Invalid payment intent"});
        }

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({message: "Payment not successful"});
        }

        const newBooking: BookingType = {
            ...req.body,
            userId: req.userId,
        };

        const hotel = await Hotel.findOneAndUpdate(
            {_id: req.params.hotelId},
            {
                $push: {bookings: newBooking}, // add newBooking to bookings array
            },
            {new: true} // return the updated document
        );

        if (!hotel) {
            return res.status(404).json({message: "Hotel not found"});
        }

        await hotel.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const constructSearchQuery = (queryParams: any) => {
    const constructedQuery: any = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            {city: new RegExp(queryParams.destination, "i")}, // i is for case-insensitive
            {country: new RegExp(queryParams.destination, "i")},
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    if (queryParams.stars) {
        constructedQuery.starRating = {
            $in: Array.isArray(queryParams.stars)
                ? queryParams.stars.map(Number)
                : [queryParams.stars].map(Number),
        };
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice.toString()),
        };
    }

    return constructedQuery;
};
