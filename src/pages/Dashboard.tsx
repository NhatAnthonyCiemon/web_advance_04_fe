import { motion } from "framer-motion";
import { LogOut, User, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();
    const { data: user, isLoading, isError, refetch, isFetching } = useUser();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    const handleRefresh = async () => {
        const res = await refetch();
        if (res.status === "success") {
            toast.success("User data refreshed!");
        } else {
            toast.error("Failed to refresh data!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/15 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white text-center"
            >
                {isLoading ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/80 text-sm"
                    >
                        Loading user information...
                    </motion.p>
                ) : isError ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-600/30 border border-red-500 text-red-50 px-4 py-3 rounded-lg"
                    >
                        Failed to fetch user information.
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center space-y-6"
                    >
                        <div className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
                            <User size={42} className="text-white" />
                        </div>

                        <h1 className="text-3xl font-extrabold drop-shadow-lg">
                            Welcome back,{" "}
                            <span className="text-pink-300">
                                {user?.username || "User"}
                            </span>{" "}
                            ✨
                        </h1>
                        <p className="text-white/80 mt-2 text-sm">
                            Email:{" "}
                            <span className="font-medium">{user?.email}</span>
                        </p>

                        {/* Nút hành động */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-4">
                            {/* 🔄 Refresh button */}
                            <motion.button
                                onClick={handleRefresh}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isFetching}
                                className={`flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 px-4 rounded-xl shadow-lg font-semibold transition-all duration-300 ${
                                    isFetching
                                        ? "bg-gray-400/40 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-indigo-300 text-white"
                                }`}
                            >
                                <motion.div
                                    animate={{
                                        rotate: isFetching ? 360 : 0,
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: isFetching ? Infinity : 0,
                                        ease: "linear",
                                    }}
                                >
                                    <RefreshCcw size={18} />
                                </motion.div>
                                {isFetching ? "Refreshing..." : "Refresh"}
                            </motion.button>

                            {/* 🚪 Logout button */}
                            <motion.button
                                onClick={handleLogout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 px-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:ring-4 focus:ring-rose-300 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                            >
                                <LogOut size={18} />
                                Logout
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                <p className="text-xs text-white/60 mt-10">
                    Designed by{" "}
                    <span className="font-semibold">Nguyen Thanh Nhat</span>
                </p>
            </motion.div>
        </div>
    );
};

export default Dashboard;
