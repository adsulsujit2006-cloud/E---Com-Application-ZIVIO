import React, { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import { Add, AddShoppingCart, DescriptionOutlined, Favorite, LocalShipping, Remove, Shield, Tune, Wallet, WorkspacePremium } from "@mui/icons-material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../State/customer/ProductSlice";

// ---- Specification fields ----
// `key` must match the field names on the Product entity exactly
// (including the spellings "wavePAttern" and "netQuentity").
const specFields: { key: string; label: string }[] = [
    { key: "topType", label: "Top type" },
    { key: "topPattern", label: "Top pattern" },
    { key: "topShape", label: "Top shape" },
    { key: "topLength", label: "Top length" },
    { key: "neck", label: "Neck" },
    { key: "sleeveLength", label: "Sleeve length" },
    { key: "bottomType", label: "Bottom type" },
    { key: "bottomPattern", label: "Bottom pattern" },
    { key: "bottomClosure", label: "Bottom closure" },
    { key: "waistband", label: "Waistband" },
    { key: "weaveType", label: "Weave type" },
    { key: "wavePAttern", label: "Wave pattern" },
    { key: "ornamentation", label: "Ornamentation" },
    { key: "designStyling", label: "Design styling" },
    { key: "packageBottom", label: "Package bottom" },
    { key: "netQuentity", label: "Net quantity" },
];

const ProductDetails = () => {
    const [quantity, setQuantity] = React.useState(1);
    const dispatch = useAppDispatch()
    const { productId } = useParams()
    const { product } = useAppSelector((store => store))
    const [activeImage, setActiveImage] = useState(0);
    const [showFullDesc, setShowFullDesc] = useState(false);

    useEffect(() => {
        dispatch(fetchProductById(String(productId)))
        setActiveImage(0)
        setShowFullDesc(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])

    const handlleActiveImage = (value: number) => () => {
        setActiveImage(value)
    }

    const description: string = product.product?.description ?? "";
    const isLongDescription = description.length > 220;
    const selling = Number(product.product?.sellingPrice ?? 0);
    const mrp = Number(product.product?.mrpPrice ?? 0);
    const savings = mrp > selling ? mrp - selling : 0;

    const quickInfo = [
        { label: "Brand", value: product.product?.seller?.businessDetails.businessName ?? "-" },
        { label: "Product", value: product.product?.title ?? "-" },
        { label: "Price", value: selling ? `₹${selling.toLocaleString("en-IN")}` : "-" },
        { label: "You save", value: savings ? `₹${savings.toLocaleString("en-IN")}` : "-" },
    ];

    // Only show specifications the seller actually filled in.
    // Cast keeps this compiling even if the Product type has no spec fields yet.
    const productData = (product.product ?? {}) as Record<string, any>;
    const specifications = specFields
        .map((field) => ({
            label: field.label,
            value: String(productData[field.key] ?? "").trim(),
        }))
        .filter((spec) => spec.value !== "");

    return (
        <div className="px-5 lg:px-20 py-8 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* ================= LEFT: IMAGES ================= */}
                <section className="flex flex-col-reverse lg:flex-row gap-5 lg:sticky lg:top-24 self-start">
                    <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
                        {product.product?.images.map((item, index) => (
                            <img
                                key={index}
                                onClick={handlleActiveImage(index)}
                                className={`lg:w-full w-[60px] h-[70px] lg:h-24 object-cover cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                                    activeImage === index
                                        ? "border-teal-500 shadow-md"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                                src={item}
                                alt={`Thumbnail ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="w-full lg:w-[85%] overflow-hidden rounded-2xl bg-white shadow-md">
                        <img
                            className="w-full h-[380px] sm:h-[520px] lg:h-[600px] object-cover transition-transform duration-500 hover:scale-105"
                            src={product.product?.images[activeImage]}
                            alt={product.product?.title ?? "Product"}
                        />
                    </div>
                </section>

                {/* ================= RIGHT: DETAILS ================= */}
                <section className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
                    <h1 className="font-bold text-xl lg:text-2xl text-teal-700 tracking-wide">
                        {product.product?.seller?.businessDetails.businessName}
                    </h1>
                    <p className="text-gray-600 font-medium text-lg mt-1">{product.product?.title}</p>

                    {/* Rating */}
                    <div className="flex justify-between items-center py-2 border border-teal-100 bg-teal-50 rounded-full w-[190px] px-4 mt-5">
                        <div className="flex gap-1 items-center font-semibold text-gray-800">
                            <span>4</span>
                            <StarIcon sx={{ color: teal[500], fontSize: "18px" }} />
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <span className="text-sm text-gray-600">234 Ratings</span>
                    </div>

                    {/* Price */}
                    <div>
                        <div className="price flex flex-wrap items-baseline gap-3 mt-6">
                            <span className="text-4xl font-bold text-gray-900">
                                ₹ {product.product?.sellingPrice}
                            </span>
                            <span className="text-xl line-through text-gray-400">
                                ₹ {product.product?.mrpPrice}
                            </span>
                            <span className="text-lg text-teal-600 font-semibold">
                                {product.product?.discountPercent}% off
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Inclusive of all taxes. Free Shipping above ₹{product.product?.sellingPrice}
                        </p>
                    </div>

                    <Divider sx={{ my: 3 }} />

                    {/* Trust points */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-3">
                            <Shield sx={{ color: teal[500] }} />
                            <p className="text-sm text-gray-700">Authentic & Quality Assured</p>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-3">
                            <WorkspacePremium sx={{ color: teal[500] }} />
                            <p className="text-sm text-gray-700">100% money back guarantee</p>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-3">
                            <LocalShipping sx={{ color: teal[500] }} />
                            <p className="text-sm text-gray-700">Free Shipping & returns</p>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-3">
                            <Wallet sx={{ color: teal[500] }} />
                            <p className="text-sm text-gray-700">Pay on delivery might be available</p>
                        </div>
                    </div>

                    <Divider sx={{ my: 3 }} />

                    {/* Quantity */}
                    <div className="space-y-3">
                        <h1 className="font-semibold text-gray-800 tracking-wide">
                            QUANTITY
                        </h1>
                        <div className="flex items-center gap-2 w-[160px] justify-between">
                            <Button
                                variant="outlined"
                                sx={{ minWidth: 42, borderRadius: "10px" }}
                                disabled={quantity === 1}
                                onClick={() => setQuantity(quantity - 1)}
                            >
                                <Remove />
                            </Button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <Button
                                variant="outlined"
                                sx={{ minWidth: 42, borderRadius: "10px" }}
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Add />
                            </Button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddShoppingCart />}
                            sx={{
                                py: "1rem",
                                borderRadius: "12px",
                                fontWeight: 600,
                                boxShadow: "0 8px 20px rgba(0,150,136,0.25)",
                            }}
                        >
                            Add To Bag
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Favorite />}
                            sx={{ py: "1rem", borderRadius: "12px", fontWeight: 600 }}
                        >
                            Wishlist
                        </Button>
                    </div>

                    {/* ================= PRODUCT DETAILS (redesigned) ================= */}
                    <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 lg:p-6">
                        {/* Heading with accent bar */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="h-8 w-1.5 rounded-full bg-teal-500" />
                            <DescriptionOutlined sx={{ color: teal[600] }} />
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                Product Details
                            </h1>
                        </div>

                        {/* Quick info tiles */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            {quickInfo.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl bg-white border border-gray-100 px-4 py-3 shadow-sm"
                                >
                                    <p className="text-xs text-gray-400">{item.label}</p>
                                    <p className="mt-0.5 font-semibold text-gray-800 truncate" title={item.value}>
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
                            <h2 className="font-semibold text-gray-800 mb-2">Description</h2>
                            <p
                                className="text-gray-600 leading-relaxed"
                                style={
                                    showFullDesc || !isLongDescription
                                        ? undefined
                                        : {
                                              display: "-webkit-box",
                                              WebkitLineClamp: 4,
                                              WebkitBoxOrient: "vertical",
                                              overflow: "hidden",
                                          }
                                }
                            >
                                {description || "No description available for this product."}
                            </p>

                            {isLongDescription && (
                                <button
                                    type="button"
                                    onClick={() => setShowFullDesc((v) => !v)}
                                    className="mt-3 text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                                >
                                    {showFullDesc ? "Show less" : "Read more"}
                                </button>
                            )}
                        </div>

                        {/* ================= SPECIFICATION ================= */}
                        <div className="mt-5 rounded-xl bg-white border border-gray-100 p-4 lg:p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Tune sx={{ color: teal[600], fontSize: "22px" }} />
                                <h2 className="font-semibold text-gray-800 text-lg">Specification</h2>
                            </div>

                            {specifications.length > 0 ? (
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                    {specifications.map((spec) => (
                                        <div
                                            key={spec.label}
                                            className="flex items-start justify-between gap-4 py-3 border-b border-gray-100"
                                        >
                                            <dt className="text-sm text-gray-500">{spec.label}</dt>
                                            <dd className="text-sm font-semibold text-gray-800 text-right break-words">
                                                {spec.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No specifications available for this product.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="mt-12 space-y-5">
                        <h2 className="text-2xl font-bold text-gray-800">Ratings & reviews</h2>
                        <ReviewCard />
                    </div>
                </section>
            </div>

            {/* ================= SIMILAR PRODUCTS ================= */}
            <div className="mt-20 bg-white rounded-2xl shadow-md p-6 lg:p-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Similar products
                </h1>
                <div className="pt-5">
                    <SimilarProduct />
                </div>
            </div>

        </div>

    );
};

export default ProductDetails;
