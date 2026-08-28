import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

const images = [
  "/productSphoto/sareephoto3.jpg",
  "/productSphoto/sarreephot4.jpg",
  "/productSphoto/sareephoto2.jpg",
  "/productSphoto/sareephoto3.jpg",
  "/productSphoto/sarreephot4.jpg",
];

interface ProductCardProps {
  product?: {
    productId?: string;
    brand?: string;
    name?: string;
    price?: number;
    mrp?: number;
    discount?: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage(
          (prevImage) => (prevImage + 1) % images.length
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <>
      <div className="group px-4 relative">
        <div
          className="card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setCurrentImage(0);
          }}
        >
          {images.map((item, index) => (
            <img
              key={index}
              className="card-media object-top"
              src={item}
              alt={`Product ${index + 1}`}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
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
            <h1>{product?.brand ?? "SZN"}</h1>
            <p>{product?.name ?? "Pink Saree"}</p>
          </div>

          <div className="price flex items-center gap-3">
            <span className="font-sans text-gray-800">
              ₹ {product?.price ?? 1000}
            </span>

            <span className="thin-line-through text-gray-400">
              ₹ {product?.mrp ?? 1499}
            </span>

            <span className="text-primary-color font-semibold">
              ({product?.discount ?? 30}% OFF)
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;