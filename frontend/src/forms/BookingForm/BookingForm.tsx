import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/shared/types";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSearchContext } from "../../context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../context/AppContext.tsx";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  totalCost: number;
  paymentIntentId: string;
};
const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: (error) => {
        console.error(error);
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    },
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      showToast({ message: "Error with payment", type: "ERROR" });
      return;
    }

    // const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
    //   },
    // });

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    console.log(result);

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-3"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>

        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>

        <label className="flex-1 text-sm font-bold text-gray-700">
          Email
          <input
            className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      {/*<div className="space-y-2">*/}
      {/*  <h2 className="text-xl font-semibold">Your Price Summary</h2>*/}

      {/*  <div className="rounded-md bg-blue-200 p-4">*/}
      {/*    <div className="text-lg font-semibold">*/}
      {/*      Total Cost: ${paymentIntent.totalCost.toFixed(2)}*/}
      {/*    </div>*/}

      {/*    <div className="text-xs">Includes taxes and charges</div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>

        {/*<div>*/}
        {/*  <label className="text-sm font-bold text-gray-700">Card Number</label>*/}
        {/*  <CardNumberElement*/}
        {/*    id="card-number-element"*/}
        {/*    className="rounded-md border p-2 text-sm"*/}
        {/*  />*/}
        {/*</div>*/}

        {/*<div className={"grid grid-cols-2 gap-3"}>*/}
        {/*  <div>*/}
        {/*    <label className="text-sm font-bold text-gray-700">*/}
        {/*      Card Expiry*/}
        {/*    </label>*/}
        {/*    <CardExpiryElement*/}
        {/*      id="card-expiry-element"*/}
        {/*      className="rounded-md border p-2 text-sm"*/}
        {/*    />*/}
        {/*  </div>*/}

        {/*  <div>*/}
        {/*    <label className="text-sm font-bold text-gray-700">CVC</label>*/}
        {/*    <CardCvcElement*/}
        {/*      id="card-cvc-element"*/}
        {/*      className="rounded-md border p-2 text-sm"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        <PaymentElement
          id="payment-element"
          className="rounded-md border p-2 text-sm"
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="text-md h-full rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Saving..." : `Pay $${paymentIntent.totalCost.toFixed(2)}`}
      </button>
    </form>
  );
};

export default BookingForm;
