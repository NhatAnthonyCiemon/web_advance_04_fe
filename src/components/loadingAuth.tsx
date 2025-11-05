import { motion } from "framer-motion";
import React from "react";

const LoadingAuth: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-white/15 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white text-center"
            >
                {/* 🔐 Animated padlock icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                        scale: [0.8, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeInOut",
                    }}
                    className="mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-400 rounded-full w-20 h-20 shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6a4.5 4.5 0 00-9 0v4.5M5.25 10.5h13.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z"
                        />
                    </svg>
                </motion.div>

                {/* ✨ Animated loading text */}
                <motion.h1
                    className="text-2xl sm:text-3xl font-extrabold mb-3 drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Loading Authentication...
                </motion.h1>

                <motion.p
                    className="text-white/80 text-sm sm:text-base"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Securing your session, please wait ✨
                </motion.p>

                {/* 💫 Progress bar shimmer */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: ["0%", "100%"] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mt-6 h-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
                />

                {/* 🖋️ Branding (optional) */}
                <p className="text-xs text-white/60 mt-8">
                    Designed by{" "}
                    <span className="font-semibold">Nguyen Thanh Nhat</span>
                </p>
            </motion.div>
        </div>
    );
};

export default LoadingAuth;
