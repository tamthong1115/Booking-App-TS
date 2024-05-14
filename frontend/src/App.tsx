import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register/Register.tsx";
import SignIn from "./pages/SignIn/SignIn.tsx";
import AddHotel from "./pages/Hotel/AddHotel.tsx";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/Hotel/MyHotels.tsx";
import EditHotel from "./pages/Hotel/EditHotel.tsx";
import Search from "./pages/Search/Search.tsx";
import Detail from "./pages/Hotel/Detail.tsx";
import Booking from "./pages/Booking/Booking.tsx";
import MyBookings from "./pages/Booking/MyBookings.tsx";
import Home from "./pages/Home/Home.tsx";
import "mapbox-gl/dist/mapbox-gl.css";
import Profile from "./components/Profile/Profile.tsx";
import AboutUs from "./pages/AboutUs/AboutUs.tsx";
import AddRoom from "./pages/Hotel/AddRoom.tsx";
import ContactUs from "./pages/Contact/ContactUs.tsx";
import VerifyEmail from "./pages/Register/VerifyEmail.tsx";
import ForgetPassword from "./pages/SignIn/ForgetPassword.tsx";
import ResetPassword from "./pages/SignIn/ResetPassword.tsx";

const App = () => {
    const { isLoggedIn } = useAppContext();
    const { isAdmin } = useAppContext();
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />

                <Route
                    path="/search"
                    element={
                        <Layout>
                            <Search />
                        </Layout>
                    }
                />

                <Route
                    path="/about-us"
                    element={
                        <Layout>
                            <AboutUs />
                        </Layout>
                    }
                />

                <Route
                    path="/contact-us"
                    element={
                        <Layout>
                            <ContactUs />
                        </Layout>
                    }
                />

                <Route
                    path="/detail/:hotelId"
                    element={
                        <Layout>
                            <Detail />
                        </Layout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />

                <Route
                    path="/sign-in"
                    element={
                        <Layout>
                            <SignIn />
                        </Layout>
                    }
                />

                <Route
                    path="/forget-password"
                    element={
                        <Layout>
                            <ForgetPassword />
                        </Layout>
                    }
                />

                <Route
                    path="/reset-password/:token"
                    element={
                        <Layout>
                            <ResetPassword />
                        </Layout>
                    }
                />
``````
                <Route
                    path="/verify-email/:token"
                    element={
                        <Layout>
                            <VerifyEmail />
                        </Layout>
                    }
                />

                {isLoggedIn && (
                    <>
                        <Route
                            path="/profile"
                            element={
                                <Layout>
                                    <Profile />
                                </Layout>
                            }
                        />

                        <Route
                            path="/hotel/:hotelId/:roomId/booking"
                            element={
                                <Layout>
                                    <Booking />
                                </Layout>
                            }
                        />

                        <Route
                            path="/my-bookings"
                            element={
                                <Layout>
                                    <MyBookings />
                                </Layout>
                            }
                        />
                    </>
                )}

                {isAdmin && (
                    <>
                        <Route
                            path="/add-hotel"
                            element={
                                <Layout>
                                    <AddHotel />
                                </Layout>
                            }
                        />

                        <Route
                            path="/my-hotels"
                            element={
                                <Layout>
                                    <MyHotels />
                                </Layout>
                            }
                        />

                        <Route
                            path="/edit-hotel/:hotelId"
                            element={
                                <Layout>
                                    <EditHotel />
                                </Layout>
                            }
                        />

                        <Route
                            path="/detail/:hotelId/add-room"
                            element={
                                <Layout>
                                    <AddRoom />
                                </Layout>
                            }
                        />
                    </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
