import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Product } from "../../../type/ProductTypes";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isHovered && item.images?.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % item.images.length);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, item.images]);

  return (
    <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)}
    className="group px-4 relative">
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
      >
        {item.images?.map((image, index) => (
          <img
            key={index}
            className="card-media object-top"
            src={image}
            alt={`${item.title} ${index + 1}`}
            style={{ transform: `translateX(${(index - currentImage) * 100}%)` }}
          />
        ))}

        {isHovered && (
          <div className="indicator flex flex-col items-center space-y-2">
            <div className="flex gap-3">
              <Button variant="contained" color="secondary">
                <Favorite sx={{ color: teal[500] }} />
              </Button>
              <Button variant="contained" color="secondary">
                <ModeComment sx={{ color: teal[500] }} />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1>{item.seller?.businessDetails?.businessName}</h1>
          <p>{item.title}</p>
        </div>

        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">₹ {item.sellingPrice}</span>
          <span className="thin-line-through text-gray-400">₹ {item.mrpPrice}</span>
          <span className="text-primary-color font-semibold">{item.discountPercent}% off</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;