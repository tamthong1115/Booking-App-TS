import { HotelType } from "../../../backend/shared/types.ts";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
      <div className={"p-4 shadow-md"}>
          <Link to={`/detail/${hotel._id}`} className={"relative cursor-pointer overflow-hidden rounded-md"}>
              <div className={"h-[300px]"}>
                  <img
                      src={hotel.imageUrls[0]}
                      className={"h-full w-full object-cover object-center"}
                      alt={hotel.name}
                  />
              </div>

              <div className="absolute bottom-0 w-full rounded-b-md bg-black bg-opacity-50 p-4">
                  <span className={"text-3xl font-bold tracking-tight text-white"}>{hotel.name}</span>
              </div>
          </Link>
          <div>
              <h1>{hotel.name}</h1>
              <p>{hotel.description}</p>
          </div>
      </div>
  );
};

export default LatestDestinationCard;
