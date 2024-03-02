import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../apt-client";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("Registration successful!");
    },
    onError: (error: Error) => {
      console.log("Registration failed!");
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    // mutate make the post request
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <span className="text-red-600">{errors.firstName.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <span className="text-red-600">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 character",
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/,
              message:
                "Password must contain one number, and one special character",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Confirm Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("confirmPassword", {
            validate: {
              required: (val) => val !== "" || "Confirm Password is required",
              matchPassword: (val) =>
                val === watch("password") || "Passwords do not match",
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex">
        <button
          type="submit"
          className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
