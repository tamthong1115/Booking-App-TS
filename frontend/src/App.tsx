import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings.tsx";
import Home from "./pages/Home/Home.tsx";
import "mapbox-gl/dist/mapbox-gl.css";
import Profile from "./components/Profile/Profile.tsx";
import ContactUs from "./components/Contact/ContactUs.tsx";

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
                            path="/hotel/:hotelId/booking"
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
                    </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
