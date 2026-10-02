import React from "react";
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Rating, Tooltip } from "@mui/material";
import { red, teal } from "@mui/material/colors";

export interface Review {
    id?: number | string;
    userName?: string;
    createdAt?: string;
    rating?: number;
    reviewText?: string;
    productImages?: string[];
}

interface ReviewCardProps {
    review?: Review;
    canDelete?: boolean;
    onDelete?: (id: number | string) => void;
}

const defaultReview: Review = {
    id: 1,
    userName: "Sujit",
    createdAt: "2024-09-27T23:16:07.478333",
    rating: 4,
    reviewText: "Value for money product, great product",
    productImages: ["PDPhoto/p.2.png"],
};

const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const ReviewCard = ({
    review = defaultReview,
    canDelete = true,
    onDelete,
}: ReviewCardProps) => {
    const name = review.userName ?? "Anonymous";

    return (
        <article className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
            <div className="flex gap-4 min-w-0">
                <Avatar
                    sx={{ width: 52, height: 52, bgcolor: "#9155FD", color: "#fff", fontWeight: 600 }}
                >
                    {name.charAt(0).toUpperCase()}
                </Avatar>

                <div className="min-w-0 space-y-2">
                    <div>
                        <p className="font-semibold text-lg text-gray-800 leading-tight">{name}</p>
                        <p className="text-sm text-gray-400">{formatDate(review.createdAt)}</p>
                    </div>

                    <Rating
                        readOnly
                        value={review.rating ?? 0}
                        precision={0.5}
                        size="small"
                        sx={{ color: teal[500] }}
                    />

                    <p className="text-gray-600 leading-relaxed break-words">
                        {review.reviewText}
                    </p>

                    {review.productImages && review.productImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {review.productImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Review by ${name} ${index + 1}`}
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-100"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {canDelete && (
                <Tooltip title="Delete review">
                    <IconButton
                        aria-label="Delete review"
                        onClick={() => review.id !== undefined && onDelete?.(review.id)}
                    >
                        <Delete sx={{ color: red[700] }} />
                    </IconButton>
                </Tooltip>
            )}
        </article>
    );
};

export default ReviewCard;