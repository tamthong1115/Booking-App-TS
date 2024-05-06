import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/Booking/BookingDetailSummary";
import LoadingComponent from "../components/Loading/Loading";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24) || 1;

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]); // re-run when checkIn or checkOut changes

  /*
    use useQuery instead of useMutation because we are only fetching data 
    and not modifying any data.
    */
  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString(),
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    },
  );

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    },
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  );

  if (!hotel) return LoadingComponent({ isLoading: true });

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
