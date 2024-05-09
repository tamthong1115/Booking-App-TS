import { useQuery } from "react-query";
import * as apiClient from "../../api-client.ts";
import LatestDestinationCard from "../../components/LastestDestinationCard.tsx";

const Home = () => {
    const { data: hotels } = useQuery("fetchHotels", () => apiClient.fetchHotels());

    const topRowHotels = hotels?.slice(0, 2) || [];
    const bottomRowHotels = hotels?.slice(2) || [];

    if (!hotels) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="space-y-3">
            <h2 className={"text-3xl font-bold"}>Latest Destinations</h2>
            <p>Most recent destinations added by our hosts</p>

            <div className="">
                <div className={"mb-10 grid gap-4"}>
                    <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
                        {topRowHotels.map((hotel) => (
                            <LatestDestinationCard hotel={hotel} />
                        ))}
                    </div>
                </div>

                <div className="space-y-3 py-4">
                    <h1 className={"text-3xl font-bold"}>Housing that guests love</h1>
                    <p>Most recent destinations added by our hosts</p>
                </div>
                <div className={"md-gird-cols-3 grid grid-cols-4 gap-5"}>
                    {bottomRowHotels.map((hotel) => (
                        <LatestDestinationCard hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
