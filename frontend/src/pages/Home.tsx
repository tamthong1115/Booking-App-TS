import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard.tsx";

const Home = () => {
  const { data: hotels } = useQuery("fetchHotels", () =>
    apiClient.fetchHotels(),
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  if (!hotels) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="space-y-3">
      <h2 className={"text-3xl font-bold"}>Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className={"grid gap-4"}>
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>

      <div className={"md-gird-cols-3 grid gap-4"}>
        {bottomRowHotels.map((hotel) => (
          <LatestDestinationCard hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Home;
