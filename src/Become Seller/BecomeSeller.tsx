import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLogin";
import { Button } from "@mui/material";

const DASHBOARD_ROUTE = "/seller"; // change if your dashboard route is different

const BecomeSeller = () => {
    const navigate = useNavigate();

    const [isRegistered, setIsRegistered] = useState(
        localStorage.getItem("sellerRegistered") === "true"
    );
    const [isLogin, setIsLogin] = useState(isRegistered);

    // Already logged in: go straight to the dashboard
    useEffect(() => {
        if (localStorage.getItem("sellerJwt")) {
            navigate(DASHBOARD_ROUTE, { replace: true });
        }
    }, [navigate]);

    const handleShowPage = () => setIsLogin((prev) => !prev);

    // Called by the register form after the account is created
    const handleRegistered = () => {
        localStorage.setItem("sellerRegistered", "true");
        setIsRegistered(true);
        setIsLogin(true);
    };

    // Called by the login form after a successful login
    const handleLoginSuccess = (jwt?: string) => {
        if (jwt) localStorage.setItem("sellerJwt", jwt);
        navigate(DASHBOARD_ROUTE, { replace: true });
    };

    return (
        <div className="grid md:gap-10 grid-cols-3 min-h-screen">
            <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
                {isLogin ? (
                    <SellerLoginForm onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <SellerAccountForm onRegistered={handleRegistered} />
                )}

                {!isRegistered && (
                    <div className="mt-10 space-y-2">
                        <h1 className="text-center text-sm font-medium">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </h1>
                        <Button
                            onClick={handleShowPage}
                            fullWidth
                            sx={{ py: "11px" }}
                            variant="outlined"
                        >
                            {isLogin ? "Register" : "Login"}
                        </Button>
                    </div>
                )}
            </section>

            <section className="hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center">
                <div className="lg:w-[70%] px-5 space-y-10">
                    <div className="space-y-2 font-bold text-center">
                        <p className="text-2xl">Join the Marketplace Revolution</p>
                        <p className="text-lg">Boost Your Sales Today</p>
                        <img
                            src="/SellerPhoto/sellerbannerimg.jpg"
                            alt="Seller marketplace banner"
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BecomeSeller;