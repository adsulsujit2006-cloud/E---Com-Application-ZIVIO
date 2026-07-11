import React from "react";

const SimilarProductCard = () => {
     return (
        <div>
            <div className="group px-4 relative">
                <div
                    className="card"
                // Reset to first image

                >

                    <img

                        className="card-media object-top"
                        src={"productSphoto/download (1).png"}
                        alt=""


                    />


                </div>
                <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
                    <div className="name">
                        <h1>SZN</h1>
                        <p>Pink Saree</p>
                    </div>
                    <div className="price flex items-center gap-3">
                        <span className="font-sans text-gray-800">
                            ₹1000
                        </span>
                        <span className="thin-line-through text-gray-400">
                            ₹1499
                        </span>
                        <span className="text-primary-color font-semibold">
                            (30%OFF)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
   
};

export default SimilarProductCard;