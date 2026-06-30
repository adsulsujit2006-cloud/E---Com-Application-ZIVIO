import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AddShoppingCart,
  FavoriteBorder,
  Storefront,
} from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";

const Navbar = () => {

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  const categories = Array.isArray(mainCategory) ? mainCategory : [mainCategory];

  return (
    <>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">

          {/* Left Side */}
          <div className="flex items-center gap-9">
            {!isLarge && <IconButton>
              <MenuIcon />
            </IconButton>
            }
            <h1 className="logo cursor-pointer text-lg md:text-3xl text-[#2F414A]">
              ZIVIO
            </h1>
          </div >

         <ul className="flex items-center font-medium text-gray-800">
  {categories.map((item:any) => (
    <li
      
      onMouseLeave={() => {
        setShowCategorySheet(false);
      }}
      onMouseEnter={() => {
        setShowCategorySheet(true);
        setSelectedCategory(item.categoryId);
      }}
      className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center"
    >
      {item.name}
    </li>
  ))}

  <li></li>
</ul>
        <div className="hidden md:flex items-center flex-1 max-w-[500px] h-[44px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden mx-6">
          <SearchIcon className="mx-3 text-gray-500" />

          <input
            type="text"
            placeholder="Search Products, Brands and More..."
            className="flex-1 h-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500 pr-3"
          />
        </div>
        {/* Right Side */}
        <div className="flex gap-1 lg:gap-6 items-center">


          {false ? (
            <Button className="flex items-center gap-2">
              <Avatar
                sx={{ width: 29, height: 29 }}
                src=""
              />

              <h1 className="font-semibold hidden lg:block">
                Login
              </h1>
            </Button>
          ) : (
            <Button variant="contained">
              Login
            </Button>
          )}

          <IconButton>
            <FavoriteBorder sx={{ fontSize: 20 }} />
          </IconButton>

          <IconButton>
            <AddShoppingCart
              className="text-gray-700"
              sx={{ fontSize: 20 }}
            />
          </IconButton>

          {isLarge && (
            <Button
              startIcon={<Storefront />}
              variant="outlined"
            >
              Seller
            </Button>
          )}

        </div>
      </div>
      {showCategorySheet &&<div 
      onMouseLeave={()=>setShowCategorySheet(false)}
      onMouseEnter={()=>setShowCategorySheet(true)}
       className='categorySheet absolute top-[4.41rem] left-20 right-20'>
        <CategorySheet selectedCategory={selectedCategory} />
      </div>}
    </Box >
    </>
  );
};

export default Navbar;