import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import LoadingComponent from "../components/Loading/Loading.tsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MyBookings = () => {
  useEffect(() => {}, []);
  const { data: hotels, isLoading } = useQuery(
    "fetchMyHotelsBookings",
    apiClient.fetchMyBookings,
  );

  if (isLoading) {
    return LoadingComponent({ isLoading });
  }

  if (!hotels || hotels.length === 0) {
    return <h1>No bookings found</h1>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="lg:gird-cols-[1fr_3fr] grid grid-cols-1 gap-4 rounded-lg border border-slate-300 p-8">
          <div className="lg:h-[250px] lg:w-full">
            <Link to={`/detail/${hotel._id}`}>
              <img
                src={hotel.imageUrls[0]}
                className="h-full w-full object-cover object-center"
                alt="hotel"
              />
            </Link>
          </div>

          <div className={"flex max-h-[300px] flex-col gap-4 overflow-y-auto"}>
            <div className={"text-2xl font-bold"}>
              {hotel.name}
              <div className={"text-sx font-normal"}>
                {hotel.city}, {hotel.country}
              </div>
            </div>
          </div>
          {hotel.bookings.map((booking) => (
            <div>
              <div>
                <span className={"mr-2 font-bold"}>Dates:</span>
                <span>
                  {new Date(booking.checkIn).toDateString()} -{" "}
                  {new Date(booking.checkOut).toDateString()}
                </span>
              </div>
              <div>
                <span className={"mr-2 font-bold"}>Guest:</span>
                <span>
                  {booking.adultCount} adults, {booking.childCount} children
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
