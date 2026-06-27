import React from "react";
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

const Navbar = () => {

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box>
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

          <ul className='flex items-center font-medium text-gray-800'>
            {["Men", "Women", "Home", "Electronics", "Beauty", "Kids  ", "GENZ"].map((item) => <li
              className='mainCategory hover:text-primary-color 
  hover:border-b-2 h-[70px] px-4 border-primary-color
  flex items-center'>
              {item}
            </li>)}
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
      </Box>
    </>
  );
};

export default Navbar;