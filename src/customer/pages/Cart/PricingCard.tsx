import { Divider } from "@mui/material";
import React from "react";

const  PricingCard= () =>{
    return(
        <>
        <div className="space-y-3 p-5">
            <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>₹999</span>

            </div>
            <div className="flex justify-between items-center">
                <span>Discount</span>
                <span>₹199</span>

            </div>
            <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span>₹49</span>

            </div>
            <div className="flex justify-between items-center">
                <span>Plateform fee</span>
                <span>free</span>

            </div>
            
            

        </div>
        <Divider/>
        <div className="flex justify-between items-center p-5 text-primary-color">
                <span>Total</span>
                <span>₹849</span>

            </div></>
    )
}
export default PricingCard