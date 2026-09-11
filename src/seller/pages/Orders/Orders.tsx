import React from "react";
import CustomizedTable from "./OrderTable";
import OrderTable from "./OrderTable";

const Orders =() =>{
    return (
        <div>
            <h1 className="font-bold mb-5 text-xl text-center">All Order Details</h1>
           <OrderTable/> 
        </div>
    )
}
export default Orders;