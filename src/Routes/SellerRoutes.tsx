import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashbord from "../seller/pages/SellerDashbord/Dashbord";
import Products from "../seller/pages/Product/Products";
import AddProduct from "../seller/pages/Product/AddProduct";
import Orders from "../seller/pages/Orders/Orders";
import Payment from "../seller/pages/Payment/Payment";
import Transaction from "../seller/pages/Transaction/Transaction";
import Profile from "../seller/pages/Account/Profile";

const SellerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Dashbord />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/account" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/transaction" element={<Transaction />} />
            </Routes>
        </div>
    );
};

export default SellerRoutes;