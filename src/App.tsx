import React from "react";
import "./App.css";

import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import customeTheme from "./Theme/customeTheme";
import Navbar from "./customer/components/Navbar/Navbar";
import Product from "./customer/pages/Product/Product";
import HomeCategory from "./customer/pages/Home/HomeCategory";
import ProductDetails from "./customer/pages/ProductDetails/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import UserDetails from "./customer/pages/Account/UserDetails";
import BecomeSeller from "./Become Seller/BecomeSeller";

function App() {
  return (
    <ThemeProvider theme={customeTheme}>
      <>
        {<Navbar />}

        <Routes>
          <Route path="/" element={<HomeCategory />} />

          <Route
            path="/products/:categoryId"
            element={<Product />}
          />

          <Route
            path="/reviews/:productId"
            element={<Review />}
          />

          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />
           <Route
            path="/account/*"
            element={<Account />}
          />

          <Route
            path="/become-seller/*"
            element={<BecomeSeller />}
          />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;