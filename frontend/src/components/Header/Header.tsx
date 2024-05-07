import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.tsx";
import SignOutButton from "../Button/SignOutButton.tsx";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const { isAdmin } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">BookingAppTS.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn && (
            <Link
              to="/my-bookings"
              className="flex items-center px-3 font-bold text-white hover:bg-blue-500"
            >
              My Bookings
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                to="/my-hotels"
                className="flex items-center px-3 font-bold text-white hover:bg-blue-500"
              >
                My Hotels
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <SignOutButton />
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
