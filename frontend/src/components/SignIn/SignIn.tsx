import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import { Link } from "react-router-dom";
import Buttons from "../Buttons";

const cx = classNames.bind(styles);

export type SignInFormData = {
    email: string;
    password: string;
};
const SignIn = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        mode: "onBlur",
    });

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign in Successful!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken"); // from isError AppContext
            console.dir(location.state);
            navigate(location.state?.from?.pathname || "/");
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
            <div className=" w-full rounded-lg shadow-lg sm:max-w-md md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <div className={cx("header-title")}>
                        <h1 className={cx("heading")}>Sign In</h1>
                        <Link to="/register">
                            <h4 className={cx("switch-btn")}>Sign Up</h4>
                        </Link>
                    </div>
                    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                        <label className="flex-1 text-sm font-bold text-gray-700">
                            <input
                                type="email"
                                className="mb-2 w-full rounded border border-gray-400 px-2 py-1 font-normal"
                                placeholder="Your email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </label>
                        <label className="flex-1 text-sm font-bold text-gray-700">
                            <input
                                type="password"
                                className="mb-2 w-full rounded border border-gray-400 px-2 py-1 font-normal"
                                placeholder="Your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 character",
                                    },
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/,
                                        message: "Password must contain one number, and one special character",
                                    },
                                })}
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </label>
                        <div className={cx("form-aside")}>
                            <div className={cx("help")}>
                                <a href="" className={cx("help-link", "forgot")}>
                                    Forgot password
                                </a>
                                <span className={cx("separate")}></span>
                                <a href="" className={cx("help-link")}>
                                    Need help
                                </a>
                            </div>
                        </div>
                        <span className={cx("controls")}>
                            <Buttons type="submit" text className={cx("btn", "btn-primary")}>
                                Login
                            </Buttons>
                            <Link to="/">
                                <Buttons text className={cx("btn")}>
                                    Return
                                </Buttons>
                            </Link>
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
