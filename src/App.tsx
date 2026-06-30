import React from "react";
// @ts-ignore: Allow side-effect import of CSS without type declarations
import "./App.css";

import { ThemeProvider } from "@mui/material";


import customeTheme from "./Theme/customeTheme";
import { Home } from "@mui/icons-material";
import HomeCategory from "./customer/pages/Home/HomeCategory";
import Navbar from "./customer/components/Navbar/Navbar";



function App() {
  return (
    <ThemeProvider theme={customeTheme}>
      <>
        <Navbar />
         <HomeCategory/>
        </>
     
    </ThemeProvider>
  );
}

export default App;