import { useQuery } from "react-query";
import LatestDestinationCard from "../../components/LastestDestinationCard/LastestDestinationCard.tsx";
import classNames from "classnames/bind";
import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LatestDestinationCardPre from "../../components/LastestDestinationCard/LatestDestinationCardPre.tsx";
import { fetchHotels } from "../../ApiClient/api-hotels.ts";

const cx = classNames.bind(styles);

const Home = () => {
    const { data: hotels } = useQuery("fetchHotels", () => fetchHotels());

    const topRowHotels = hotels?.slice(0, 2) || [];
    const bottomRowHotels = hotels?.slice(2) || [];

    if (!hotels) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="space-y-3">
            <div className="">
                <div className={cx("inner")}>
                    <div className={cx("inner-img")}>
                        <img src="https://tnhotel.id.vn/wp-content/uploads/2024/04/1-768x1365.png" alt="Experience" />
                    </div>
                    <div className={cx("inner-img")}>
                        <img src="https://tnhotel.id.vn/wp-content/uploads/2024/04/2-768x1365.png" alt="Experience" />
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                            <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                            <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                            <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                            <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                        </div>
                        <div>
                            <h1 className={cx("inner-title")}>Experience the experience that matters</h1>
                        </div>
                        <div>
                            <h1 className={cx("inner-heading")}>BookingTS</h1>
                        </div>
                        <div>
                            <p className={cx("inner-text")}>
                                Welcome to BookingTS, the leading hotel in Vietnam! We are proud to be a trusted
                                destination for everyone when choosing where to stay in your destinations.
                            </p>
                            <p className={cx("inner-text")}>
                                Whether you're looking for a relaxing beach holiday, a city adventure or a cultural
                                travel experience, we have everything to suit your needs. Start your journey today with
                                us!
                            </p>
                        </div>
                        <div>
                            <Link to="/about-us">
                                <button className={cx("inner-btn")}>See more</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={"mb-10 grid gap-4"}>
                    <h1 className={"text-3xl font-bold"}>Latest Destinations</h1>
                    <p>Most recent destinations added by our hosts</p>
                    <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
                        {topRowHotels.map((hotel) => (
                            <LatestDestinationCardPre hotel={hotel} />
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
