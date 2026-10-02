import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SellerDrawerList from "../../components/SellerDrawerList/SellerDrawerList";
import SellerRoutes from "../../../Routes/SellerRoutes";

const SellerDashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <div className="lg:flex min-h-screen bg-gray-50">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center gap-3 p-3 border-b bg-white">
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <h1 className="font-semibold text-teal-600">Seller Panel</h1>
      </div>

      {/* Mobile drawer */}
      <Drawer open={open} onClose={toggleDrawer} className="lg:hidden">
        <div className="w-64 h-full">
          <SellerDrawerList toggleDrawer={toggleDrawer} />
        </div>
      </Drawer>

      {/* Desktop sidebar */}
      <section className="hidden lg:block w-64 shrink-0 border-r bg-white h-screen sticky top-0">
        <SellerDrawerList toggleDrawer={() => {}} />
      </section>

      {/* Page content */}
      <section className="flex-1 p-5 lg:p-10 overflow-y-auto">
        <SellerRoutes />
      </section>
    </div>
  );
};

export default SellerDashboard;