import React from "react";
import  "./ShopByCategory.css"

const ShopByCategoryCard = () => {
    return (
        <div className="flex gap-3 flex-col justify-center items-center group cursor-pointer">
            <div className="custome-border w-[150px] h-[150px] lg:w-[249px] lg:h-[240px] rounded-full bg-primary-color">
                <img
                    className="rounded-full group-hover:scale-95 transition-transform duration-700 object-cover object-top h-full w-full"
                    src="ShopByCategoryPhoto/kitchnPhoto.jpg"
                    alt="Kitchen & table"
                />
            </div>
            <div>Kitchen &amp; table</div>
        </div>
    );
};

export default ShopByCategoryCard;