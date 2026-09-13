import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerTable from "../admin/Pages/Seller/SellerTable";
import Coupan from "../admin/Pages/Coupan/Coupan";
import AddNewCoupan from "../admin/Pages/Coupan/AddNewCoupan";
import GridTable from "../admin/Pages/HomePage/GridTable";
import ElectronicsTable from "../admin/Pages/HomePage/ElectronicsTable";
import ShopByCategory from "../admin/Pages/HomePage/ShopByCategory";
import Deal from "../admin/Pages/HomePage/Deal";

const AdminRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SellerTable />} />
                <Route path="/coupon" element={<Coupan />} />
                <Route path="/add-coupan" element={<AddNewCoupan />} />
                <Route path="/home-grid" element={<GridTable />} />
                <Route path="/electronics-category" element={<ElectronicsTable />} />
                <Route path="/shop-by-category" element={<ShopByCategory />} />
                <Route path="/deals" element={<Deal />} />
            </Routes>
        </div>
    );
};

export default AdminRoute;