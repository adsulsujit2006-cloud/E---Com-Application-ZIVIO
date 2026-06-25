import React from "react";
// @ts-ignore: Allow side-effect import of CSS without type declarations
import "./App.css";

import { ThemeProvider } from "@mui/material";

import Navbar from "./customer/components/Navbar";
import customeTheme from "./Theme/customeTheme";
function App() {
  return (
    <ThemeProvider theme={customeTheme}>
      <div>
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;