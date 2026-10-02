import React from "react";
import { Divider, Rating } from "@mui/material";
import { teal } from "@mui/material/colors";
import ReviewCard, { type Review as ReviewType } from "./ReviewCard";

// Replace this with your API / Redux data, e.g. const reviews = useAppSelector(...)
const reviews: ReviewType[] = [
    { id: 1, userName: "Sujit", createdAt: "2024-09-27T23:16:07", rating: 4, reviewText: "Value for money product, great product", productImages: ["PDPhoto/p.2.png"] },
    { id: 2, userName: "Priya", createdAt: "2024-09-20T10:05:00", rating: 5, reviewText: "Beautiful colour and the fabric drapes really well." },
    { id: 3, userName: "Rohan", createdAt: "2024-09-12T18:40:00", rating: 3, reviewText: "Good saree, but the blouse piece is a little short." },
    { id: 4, userName: "Sneha", createdAt: "2024-09-05T09:15:00", rating: 5, reviewText: "Loved it. Fast delivery and neat packaging." },
    { id: 5, userName: "Amit", createdAt: "2024-08-30T14:22:00", rating: 4, reviewText: "Nice finish and the border work looks premium." },
    { id: 6, userName: "Kavya", createdAt: "2024-08-22T11:00:00", rating: 5, reviewText: "Comfortable to wear all day, and the colour does not fade." },
    { id: 7, userName: "Vikram", createdAt: "2024-08-15T16:30:00", rating: 2, reviewText: "Okay product, but delivery was late." },
    { id: 8, userName: "Meera", createdAt: "2024-08-10T13:10:00", rating: 4, reviewText: "Looks exactly like the pictures. Happy with the purchase." },
    { id: 9, userName: "Rahul", createdAt: "2024-08-02T20:45:00", rating: 5, reviewText: "Gifted this to my mother and she loved it." },
];

const product = {
    image: "PDPhoto/p.2.png",
    brand: "SZN",
    title: "Pink saree",
    sellingPrice: 1000,
    mrpPrice: 1499,
};

const Review = () => {
    const total = reviews.length;
    const average = total
        ? reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / total
        : 0;

    const distribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => Math.round(r.rating ?? 0) === star).length;
        return { star, count, percent: total ? (count / total) * 100 : 0 };
    });

    const discount = Math.round(
        ((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8 lg:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* ---------- LEFT: product summary (stays in view while scrolling) ---------- */}
                <section className="w-full lg:w-[30%] lg:sticky lg:top-24 bg-white rounded-2xl shadow-sm overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="p-5 space-y-2">
                        <p className="font-bold text-teal-700 text-lg">{product.brand}</p>
                        <p className="text-gray-600 text-lg">{product.title}</p>

                        <div className="flex flex-wrap items-baseline gap-3 pt-2">
                            <span className="text-3xl font-bold text-gray-900">
                                ₹{product.sellingPrice}
                            </span>
                            <span className="text-lg line-through text-gray-400">
                                ₹{product.mrpPrice}
                            </span>
                            <span className="font-semibold text-teal-600">({discount}% off)</span>
                        </div>
                    </div>
                </section>

                {/* ---------- RIGHT: summary + ALL reviews ---------- */}
                <section className="w-full lg:flex-1 min-w-0 bg-white rounded-2xl shadow-sm p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ratings & reviews</h2>

                    {/* Rating summary */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-center bg-teal-50 border border-teal-100 rounded-2xl p-5">
                        <div className="text-center sm:text-left">
                            <div className="text-5xl font-bold text-gray-900">
                                {average.toFixed(1)}
                            </div>
                            <Rating
                                value={average}
                                precision={0.1}
                                readOnly
                                sx={{ color: teal[500], mt: 1 }}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {total} review{total !== 1 ? "s" : ""}
                            </p>
                        </div>

                        <div className="flex-1 w-full space-y-2">
                            {distribution.map(({ star, count, percent }) => (
                                <div key={star} className="flex items-center gap-3 text-sm">
                                    <span className="w-12 text-gray-700">{star} star</span>
                                    <div className="flex-1 h-2.5 rounded-full bg-white overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-teal-500"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    <span className="w-6 text-right text-gray-500">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Divider sx={{ my: 3 }} />

                    {/* Every review is rendered: no slice, no fixed height, no overflow clipping */}
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <ReviewCard
                                key={review.id ?? index}
                                review={review}
                                canDelete={false}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Review;