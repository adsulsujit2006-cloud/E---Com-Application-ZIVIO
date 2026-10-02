import { Seller } from "./SellerTypes";

export interface Category {
    id?: number;
    name: string;
    categoryId: string;
    parentCategory?: Category | null;
    level: number;
}

export interface User {
    id?: number;
    fullName: string;
    email: string;
    mobile?: string;
}

export interface Review {
    id?: number;
    reviewText: string;
    rating: number;
    user?: User;
    createAt?: string;
}

export interface Product {
    id?: number;
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercent: number;
    quantity: number;
    color: string;
    images: string[];
    numRating?: number;          // FIX: was numRatings (DB column is num_rating)
    category?: Category;
    seller?: Seller;
    reviews?: Review[];          // ADDED: backend loads reviews with each product
    createAt?: string;           // FIX: JSON sends dates as strings, not Date objects
    sizes: string;
}