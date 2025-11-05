import { Toaster } from "react-hot-toast";

const GlobalToast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: {
                    background:
                        "linear-gradient(to right, #9333ea, #ec4899, #3b82f6)",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
                success: {
                    iconTheme: {
                        primary: "#a7f3d0",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#fecaca",
                        secondary: "#fff",
                    },
                },
            }}
        />
    );
};

export default GlobalToast;
