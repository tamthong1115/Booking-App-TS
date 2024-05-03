import { AiFillStar } from "react-icons/ai";
import { fetchHotelById } from "../api-client";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import LoadingComponent from "../components/Loading/Loading";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId, // This is to prevent the query from running when the hotelId is not available
    },
  );

  if (!hotel) {
    return (
      LoadingComponent({ isLoading: true })
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel?.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {hotel.imageUrls.map((url: string) => (
          <div className="h-[300px]">
            <img
              src={url}
              alt={hotel.name}
              className="h-full w-full rounded-md object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility: string) => (
          <div className="border border-slate-300 rounded-sm p-3">{facility}</div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
