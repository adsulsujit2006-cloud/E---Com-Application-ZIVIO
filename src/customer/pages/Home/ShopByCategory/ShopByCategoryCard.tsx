import React from "react";
import "./ShopByCategory.css";

interface ShopByCategoryCardProps {
    image: string;
    title: string;
    onClick?: () => void;
}

const ShopByCategoryCard = ({
    image = "ShopByCategoryPhoto/kitchnPhoto.jpg",
    title = "Kitchen & table",
    onClick,
}: Partial<ShopByCategoryCardProps>) => {
    return (
        <div
            className="group flex cursor-pointer flex-col items-center justify-center gap-3"
            onClick={onClick}
        >
            <div className="custome-border h-[150px] w-[150px] rounded-full bg-primary-color lg:h-[240px] lg:w-[249px]">
                <img
                    className="h-full w-full rounded-full object-cover object-top transition-transform duration-700 group-hover:scale-95"
                    src={image}
                    alt={title}
                />
            </div>
            <div className="text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-pink-600 lg:text-base">
                {title}
            </div>
        </div>
    );
};

export default ShopByCategoryCard;
