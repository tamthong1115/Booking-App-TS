import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();

  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const minDateTomorrow = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col gap-4 bg-blue-200 p-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form onSubmit={handleSubmit(isLoggedIn ? onSubmit : onSignInClick)}>
        <div className="grid grid-cols-1 items-start gap-4">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full rounded-sm bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />

            {errors.checkIn && (
              <span className="text-sm font-semibold text-red-500">
                {errors.checkIn.message}
              </span>
            )}
          </div>

          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDateTomorrow}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full rounded-sm bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />

            {errors.checkOut && (
              <span className="text-sm font-semibold text-red-500">
                {errors.checkOut.message}
              </span>
            )}
          </div>

          <div className="flex gap-2 rounded-sm bg-white px-2 py-1">
            <label className="flex items-center">
              Adults:
              <input
                className="w-full  p-1 font-bold focus:outline-none "
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Minimum value is 1",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>

            <label className="flex items-center rounded-sm">
              Children:
              <input
                className="w-full  p-1 font-bold focus:outline-none "
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-sm font-semibold text-red-500">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="h-full bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500 ">
              Book Now
            </button>
          ) : (
            <button className="h-full bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500 ">
              Sign in to book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
