import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CheckCircle,
    XCircle,
    Eye,
    EyeOff,
    Mail,
    User,
    Lock,
    ArrowLeft,
} from "lucide-react";
import { useRegisterUser } from "../hooks/useRegisterUser";

type FormValues = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending, isError, isSuccess, error } = useRegisterUser();

    const onSubmit = (data: FormValues) => {
        mutate({
            email: data.email,
            password: data.password,
            username: data.username,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-white/15 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white"
            >
                <Link
                    to="/"
                    className="absolute top-5 left-6 flex items-center gap-2 text-[#abff1d] hover:text-white transition-colors duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg px-2 py-1"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>

                <div className="mb-8 text-center mt-4">
                    <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">
                        Create Account
                    </h1>
                    <p className="text-white/90 text-sm">
                        Join us today and start exploring!
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="mb-2 font-semibold text-white text-sm flex items-center gap-2">
                            <Mail size={18} /> Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="text"
                            placeholder="your@email.com"
                            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-400"
                        />
                        {errors.email && (
                            <p className="text-red-300 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="mb-2 font-semibold text-white text-sm flex items-center gap-2">
                            <User size={18} /> Username
                        </label>
                        <input
                            {...register("username", {
                                required: "Username is required",
                            })}
                            type="text"
                            placeholder="Your username"
                            className="w-full p-3 rounded-lg bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-400"
                        />
                        {errors.username && (
                            <p className="text-red-300 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 font-semibold text-white text-sm flex items-center gap-2">
                            <Lock size={18} /> Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full p-3 rounded-lg bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-400 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                            >
                                {showPassword ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-300 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 font-semibold text-white text-sm flex items-center gap-2">
                            <Lock size={18} /> Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (val) =>
                                        val === watch("password") ||
                                        "Passwords do not match",
                                })}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full p-3 rounded-lg bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-400 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                            >
                                {showConfirmPassword ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-300 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* ⚠️ Server Error */}
                    {isError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 bg-red-600/30 border border-red-500 text-red-50 px-4 py-3 rounded-lg"
                        >
                            <XCircle size={18} />
                            <p className="text-sm">
                                {(error as any)?.response?.data?.mes ||
                                    "An unexpected error occurred."}
                            </p>
                        </motion.div>
                    )}

                    {/* ✅ Success */}
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 bg-green-500/30 border border-green-400 text-green-50 px-4 py-3 rounded-lg"
                        >
                            <CheckCircle size={18} />
                            <p className="text-sm">
                                Registration successful!{" "}
                                <Link
                                    to="/login"
                                    className="underline ml-1 font-semibold"
                                >
                                    Login here
                                </Link>
                            </p>
                        </motion.div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full py-3 rounded-lg font-bold text-lg mt-6 transition transform hover:scale-105 ${
                            isPending
                                ? "bg-gray-400/50 cursor-not-allowed"
                                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg text-white cursor-pointer"
                        }`}
                    >
                        {isPending ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-white/70 text-sm mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-white font-semibold hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
