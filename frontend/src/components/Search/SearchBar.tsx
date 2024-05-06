import { FormEvent, useState } from "react";
import { useSearchContext } from "../../context/SearchContext.tsx";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  // this is the local, only upload to global context when user submit
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    );
    navigate("/search");
  };

  const minDate = new Date();
  const minDateTomorrow = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      className="-mt-8 grid grid-cols-2 items-center gap-4 rounded bg-orange-400 p-3 shadow-md lg:grid-cols-3 2xl:grid-cols-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-1 flex-row items-center rounded-sm bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex gap-2 rounded-sm bg-white px-2 py-1">
        <label className="flex items-center">
          Adults:
          <input
            className="w-full  p-1 font-bold focus:outline-none "
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>

        <label className="flex items-center rounded-sm">
          Children:
          <input
            className="w-full  p-1 font-bold focus:outline-none "
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full rounded-sm bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDateTomorrow}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full rounded-sm bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1">
        <button className="h-full w-2/3 rounded-sm bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
          Search
        </button>
        <button className="h-full w-1/3 rounded-sm bg-red-600 p-2 text-xl font-bold text-white hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
