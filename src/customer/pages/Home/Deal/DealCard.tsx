import React from "react";

interface DealCardProps {
    image: string;
    title: string;
    discountLabel: string;
    onShopNow?: () => void;
}

const DealCard = ({
    image = "/DealPhoto/mwatch.jpg",
    title = "Smart Watch",
    discountLabel = "20% OFF",
    onShopNow,
}: Partial<DealCardProps>) => {
    return (
        <div
            className="group w-[13rem] cursor-pointer overflow-hidden rounded-lg border-[3px] border-pink-600 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            onClick={onShopNow}
        >
            <div className="relative h-[12rem] w-full overflow-hidden">
                <img
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                    src={image}
                    alt={title}
                />
                <span className="absolute right-2 top-2 rounded-full bg-pink-600 px-3 py-1 text-xs font-bold text-white shadow">
                    {discountLabel}
                </span>
            </div>

            <div className="bg-black p-3 text-center text-white">
                <p className="truncate text-lg font-semibold">{title}</p>
                <p className="mt-1 text-2xl font-bold text-pink-500">
                    {discountLabel}
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gray-300 transition-colors duration-300 group-hover:text-white">
                    Shop now
                </p>
            </div>
        </div>
    );
};

export default DealCard;
