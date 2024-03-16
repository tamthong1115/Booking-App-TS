import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apt-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

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
    <div className=" flex flex-col items-center justify-center px-3 py-4 lg:py-0">
      <div className="dark:border-gray-7000 w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:bg-gray-700">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
            Sign In
          </h1>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
            <span>
              <button
                type="submit"
                className="w-full rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
              >
                Login
              </button>
            </span>
            <div className="text-sm dark:text-gray-400">
              Not registered?{" "}
              <a
                href="/register"
                className="dark:text-primary-500 font-medium text-blue-600 hover:underline"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
