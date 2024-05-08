import { AiFillStar } from "react-icons/ai";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import LoadingComponent from "../components/Loading/Loading";
import MapboxGL from "../components/Map/MapboxGL.tsx";
import ReviewForm from "../forms/ReviewForm/ReviewForm.tsx";
import Reviews from "../components/Review/Reviews.tsx";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId, // This is to prevent the query from running when the hotelId is not available
    },
  );
  
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  );

  if (!hotel) {
    return LoadingComponent({ isLoading: true });
  }


  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel?.starRating }).map(() => (
            <AiFillStar className="fill-yellowpk.eyJ1IjoiaG9saWRkYXkxMTIzIiwiYSI6ImNsdnc5bmdsczF1bmEya29iY3lveXcwMDYifQ.r4YHH1hxI-T2PwY7Cvcqxg-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="flex justify-between gap-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {hotel.imageUrls.map((url: string, index: number) => (
            <div key={index} className="h-[300px]">
              <img
                src={url}
                alt={hotel.name}
                className="h-full w-full rounded-md object-cover object-center"
              />
            </div>
          ))}
        </div>

        <MapboxGL hotel={hotel} />
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
        {hotel.facilities.map((facility: string) => (
          <div className="rounded-sm border border-slate-300 p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm hotel={hotel} />
        </div>
      </div>

      <div>
        <ReviewForm hotelId={hotelId ?? ""} currentUser={currentUser} />
        <Reviews hotelId={hotelId ?? ""} userId={currentUser?._id} />
      </div>
    </div>
  );
};

export default Detail;
