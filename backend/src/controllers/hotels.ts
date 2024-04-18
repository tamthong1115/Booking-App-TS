import {RequestHandler} from "express";
import Hotel from "../models/hotel";
import {HotelSearchResponse} from "../../shared/types";

export const searchHotels: RequestHandler = async (req, res) => {
    try {
        const query = constructSearchQuery(req.query);
        // console.log(req.query);
        // console.log(query);
        // console.log("BREAKKKKKKKKKKKKKK");
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

const constructSearchQuery = (queryParams: any) => {
    const constructedQuery: any = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            {city: new RegExp(queryParams.destination, "i")},
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
