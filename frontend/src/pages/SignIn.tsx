import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apt-client";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken"); // from isError AppContext

      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold ">Sign In</h2>
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
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered? <Link to="/register">Create an account here</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
