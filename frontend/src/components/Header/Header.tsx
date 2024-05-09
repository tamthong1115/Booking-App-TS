import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.tsx";
import SignOutButton from "../Button/SignOutButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    const { isAdmin } = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl font-bold tracking-tight text-white">
                    <Link to="/">BookingAppTS.com</Link>
                </span>

                <div className="ml-80 flex">
                    <Tippy delay={[400, 50]} placement="bottom" content="Notification">
                        <button className=" ml-6 flex  h-8 cursor-pointer items-center rounded-md bg-transparent px-4 py-2 text-white hover:bg-blue-700">
                            <FontAwesomeIcon className="text-lg" icon={faBell} />
                        </button>
                    </Tippy>
                    <Tippy delay={[400, 50]} placement="bottom" content="Contact customer service">
                        <button className=" ml-6 flex  h-8 cursor-pointer items-center rounded-md bg-transparent px-4 py-2 text-white hover:bg-blue-700">
                            <FontAwesomeIcon className="text-lg " icon={faCircleQuestion} />
                        </button>
                    </Tippy>
                </div>

                <span className="flex space-x-2">
                    {isLoggedIn && (
                        <Link
                            to="/my-bookings"
                            className="flex items-center rounded px-3 font-bold text-white hover:bg-blue-500"
                        >
                            My Bookings
                        </Link>
                    )}
                    {isAdmin && (
                        <>
                            <Link
                                to="/my-hotels"
                                className="flex items-center rounded px-3 font-bold text-white hover:bg-blue-500"
                            >
                                My Hotels
                            </Link>
                        </>
                    )}

                    {isLoggedIn ? (
                        <SignOutButton />
                    ) : (
                        <div className="flex">
                            <Link
                                to="/sign-in"
                                className="flex h-8 items-center rounded-sm bg-white px-3 font-medium text-blue-600 hover:bg-gray-100 md:mr-2 md:max-w-none"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className=" flex h-8 items-center rounded-sm bg-white px-3 font-medium text-blue-600 hover:bg-gray-100 md:mr-2 md:max-w-none"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
