import React from "react";
import "./App.css";

import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import customeTheme from "./Theme/customeTheme";
import Navbar from "./customer/components/Navbar/Navbar";
import Product from "./customer/pages/Product/Product";
import HomeCategory from "./customer/pages/Home/HomeCategory";
// import HomeCategory from "./customer/pages/Home/HomeCategory";

function App() {
  return (
   
      <ThemeProvider theme={customeTheme}>
        <>
          <Navbar />
         {/* <HomeCategory />*/} 
          <Product />
        </>
      </ThemeProvider>
   
  );
}

export default App;