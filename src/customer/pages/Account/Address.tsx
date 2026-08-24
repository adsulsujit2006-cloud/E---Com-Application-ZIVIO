import React from "react";
import UserAddressCart from "./UserAddressCard";

const Address = () =>{
    return (
        <div className="space-y-3">
            {[1,1,1,1,1].map((item)=><UserAddressCart/>)}
        </div>
    )
}
export default Address