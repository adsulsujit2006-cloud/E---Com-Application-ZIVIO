
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashbord from "../seller/pages/SellerDashbord/Dashbord";
import Products from "../seller/pages/Product/Products";
import AddProduct from "../seller/pages/Product/AddProduct";
import Orders from "../seller/pages/Orders/Orders";
import Profile from "../seller/pages/Account/Profile";
import Payment from "../seller/pages/Payment/Payment";

const SellerRoutes = () =>{
    return(
        <div>
<Routes>
    <Route path="/" element={<Dashbord/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/add-product" element={<AddProduct/>} />
<Route path="/orders" element={<Orders/>} />
<Route path="/profile" element={<Profile/>} />
<Route path="/payment" element={<Payment/>} />
</Routes>
        </div>
    )
}
export default SellerRoutes