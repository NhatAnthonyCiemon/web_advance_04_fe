import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthContext } from "../contexts/useAuthContext";

type FormValues = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const { mutate, isPending, isError, error } = useLoginUser();
    const [showPassword, setShowPassword] = React.useState(false);

    // ✅ Validation setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        mode: "onBlur",
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = (data: FormValues) => {
        mutate(data, {
            onSuccess: (res) => {
                const { access_token, refresh_token } = res;

                if (access_token && refresh_token) {
                    login(access_token, refresh_token);
                    toast.success("Login successful! Redirecting...");
                    setTimeout(() => navigate("/dashboard"), 1500);
                }
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 px-4 py-8">
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

                <div className="mb-8 mt-4 text-center">
                    <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">
                        Welcome Back
                    </h1>
                    <p className="text-white/90 text-sm">
                        Log in to your account and continue your journey!
                    </p>
                </div>

                {/* ✅ Form bắt lỗi đầy đủ */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                >
                    {/* Email */}
                    <div>
                        <label className="mb-2 font-semibold text-white text-sm flex items-center gap-2">
                            <Mail size={18} />
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        "Please enter a valid email address",
                                },
                            })}
                            type="email"
                            placeholder="your@email.com"
                            className={`w-full p-3 rounded-lg bg-white/90 text-gray-800 outline-none focus:ring-2 ${
                                errors.email
                                    ? "focus:ring-red-300"
                                    : "focus:ring-purple-300"
                            } placeholder-gray-400`}
                        />
                        {errors.email && (
                            <p className="text-red-300 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 font-semibold text-white text-sm flex items-center gap-2">
                            <Lock size={18} />
                            Password
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
                                className={`w-full p-3 rounded-lg bg-white/90 text-gray-800 outline-none focus:ring-2 placeholder-gray-400 pr-10 ${
                                    errors.password
                                        ? "focus:ring-red-300"
                                        : "focus:ring-pink-300"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
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

                    {/* Server Error */}
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full py-3 rounded-lg font-bold text-lg mt-6 transition transform hover:scale-105 ${
                            isPending
                                ? "bg-gray-400/50 cursor-not-allowed"
                                : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg text-white cursor-pointer"
                        }`}
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-white/70 text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-white font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
