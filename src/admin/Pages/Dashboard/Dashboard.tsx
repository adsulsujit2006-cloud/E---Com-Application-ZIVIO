import React from "react";
import AdminDrawerList from "../../Components/AdminDrawerList";
import AdminRoute from "../../../Routes/AdminRoutes";

const AdminDashbord =() => {
    const toggleDrawer = () =>{}
    return (
        <div>
            <div className="lg:flex lg:h-[90vh]">

                <section className="hidden lg:block h-full">
                 <AdminDrawerList toggleDrawer={toggleDrawer} />
                </section>

                <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
                  <AdminRoute />
                </section>

            </div>
        </div>
    )
}

export default AdminDashbord