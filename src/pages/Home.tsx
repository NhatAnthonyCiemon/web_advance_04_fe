import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { useAuthContext } from "../contexts/useAuthContext";

const Home: React.FC = () => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    if (isAuthenticated) {
        navigate("/dashboard");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/15 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white text-center"
            >
                <motion.h1
                    className="text-4xl font-extrabold mb-3 drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Welcome 👋
                </motion.h1>

                <motion.p
                    className="text-white/90 mb-8 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Manage your account, register new users, or log in to
                    continue your journey.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 py-3 px-4 w-full sm:w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <LogIn size={18} />
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="flex items-center justify-center gap-2 py-3 px-4 w-full sm:w-1/2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <UserPlus size={18} />
                        Sign Up
                    </Link>
                </motion.div>

                <p className="text-xs text-white/60 mt-8">
                    Designed by{" "}
                    <span className="font-semibold">Nguyen Thanh Nhat</span>
                </p>
            </motion.div>
        </div>
    );
};

export default Home;
