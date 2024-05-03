import { useForm } from "react-hook-form";
import { UserType } from "../../../../backend/shared/types";

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};
const BookingForm = ({ currentUser }: Props) => {
  
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-3">
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
    </form>
  );
};

export default BookingForm;
