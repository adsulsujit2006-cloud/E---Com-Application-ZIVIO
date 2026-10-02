import React, { useEffect, useMemo, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRight,
    FilterAlt,
    KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";

// "women_saree" -> "Women Saree"
const formatCategory = (category?: string) =>
    category ? category.replace(/[-_]/g, " ") : "All Products";

// Must match the page size used in the backend (PageRequest.of(pageNo, 10, ...))
const PAGE_SIZE = 10;

// ---- Pagination button styles ----
const pageButtonSx = {
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.95rem",
    borderRadius: "8px",
    px: { xs: 1.5, sm: 2.5 },
    py: 1.25,
    color: "#1B1F1C",
    backgroundColor: "#FFFFFF",
    border: "1px solid #DFE3DE",
    boxShadow: "none",
    "&:hover": { backgroundColor: "#F6F7F5", borderColor: "#1F4B43", boxShadow: "none" },
    "&.Mui-disabled": { color: "#8A9199", backgroundColor: "#FFFFFF", borderColor: "#DFE3DE" },
};

const Product = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

    const [showFilter, setShowFilter] = useState(false);

    const dispatch = useAppDispatch();
    const [searchParam, setSearchParams] = useSearchParams();
    const { category } = useParams();
    const { products, totalPages, loading, error } = useAppSelector(
        (store) => store.product
    );

    // sort lives in the URL only, so refresh / back button keep it
    const sort = searchParam.get("sort") || "";
    const queryString = searchParam.toString();

    /*
     * PAGINATION
     * The page is remembered together with the category + filters it belongs to.
     * When the category or any filter/sort changes, the stored key no longer
     * matches, so the page falls back to 1 automatically (one request only).
     */
    const filterKey = useMemo(
        () => `${category ?? ""}?${queryString}`,
        [category, queryString]
    );
    const [pageState, setPageState] = useState({ key: "", page: 1 });
    const page = pageState.key === filterKey ? pageState.page : 1;

    /*
     * "Next" is enabled only when the current page is full (10 items), so it can
     * never lead to an empty page, and the server's totalPages (when valid) is
     * respected as an upper limit. The total is NOT shown to the user, so a
     * wrong totalPages value can no longer appear on screen.
     */
    const serverLastPage = Number(totalPages) > 0 ? Number(totalPages) : Infinity;
    const hasPrev = page > 1;
    const hasNext = products.length >= PAGE_SIZE && page < serverLastPage;

    const handleSortChange = (event: any) => {
        const params = new URLSearchParams(searchParam);
        params.set("sort", event.target.value);
        setSearchParams(params);
    };

    const goToPage = (value: number) => {
        const next = Math.max(value, 1);
        if (next === page) return;
        setPageState({ key: filterKey, page: next });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const params = new URLSearchParams(queryString);
        const [minPrice, maxPrice] = params.get("price")?.split("-") || [];
        const discount = params.get("discount");

        dispatch(
            fetchAllProducts({
                category,                                   // <-- category wise
                color: params.get("color") || undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                minDiscount: discount ? Number(discount) : undefined,
                sort: params.get("sort") || undefined,
                pageNumber: page - 1, // backend is 0-based
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, queryString, page, dispatch]);

    return (
        <div className="mt-10">
            <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase">
                {formatCategory(category)}
            </h1>

            <div className="lg:flex">
                <section className="filter_section hidden lg:block w-[20%]">
                    <FilterSection />
                </section>

                <div className="w-full lg:w-[80%] space-y-5">
                    <div className="flex justify-between items-center px-9 min-h-[40px]">
                        <div className="relative w-[50%]">
                            {!isLarge && (
                                <IconButton onClick={() => setShowFilter((prev) => !prev)}>
                                    <FilterAlt />
                                </IconButton>
                            )}
                            {!isLarge && showFilter && (
                                <Box>
                                    <FilterSection />
                                </Box>
                            )}
                        </div>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl size="small" sx={{ width: "200px" }}>
                                <InputLabel id="sort-label">Sort</InputLabel>
                                <Select
                                    labelId="sort-label"
                                    id="sort"
                                    value={sort}
                                    label="Sort"
                                    onChange={handleSortChange}
                                >
                                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                                    <MenuItem value="top-rating">Customer Rating</MenuItem>
                                    <MenuItem value="better-discount">Better Discount</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <Divider />

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <CircularProgress />
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500 py-20">{error}</p>
                    ) : products.length === 0 ? (
                        <p className="text-center text-gray-500 py-20">
                            No products found in this category.
                        </p>
                    ) : (
                        <section className="product_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
                            {products.map((item: any) => (
                                <ProductCard key={item.id} item={item} />
                            ))}
                        </section>
                    )}

                    {/* ---- Pagination: « First | ‹ Previous | Page X | Next › ---- */}
                    {(hasPrev || hasNext) && (
                        <nav
                            aria-label="Pagination"
                            className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-10 px-5"
                        >
                            {/* Jump to first page */}
                            <Button
                                onClick={() => goToPage(1)}
                                disabled={!hasPrev || loading}
                                startIcon={<KeyboardDoubleArrowLeft />}
                                sx={{
                                    ...pageButtonSx,
                                    border: "none",
                                    backgroundColor: "transparent",
                                    "&:hover": { backgroundColor: "transparent", color: "#1F4B43" },
                                    "&.Mui-disabled": { color: "#8A9199", backgroundColor: "transparent", border: "none" },
                                    "& .MuiButton-startIcon": { mr: { xs: 0, sm: 1 } },
                                }}
                            >
                                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                                    First
                                </Box>
                            </Button>

                            <Button
                                onClick={() => goToPage(page - 1)}
                                disabled={!hasPrev || loading}
                                startIcon={<ChevronLeft />}
                                sx={pageButtonSx}
                            >
                                Previous
                            </Button>

                            <p className="text-sm font-semibold text-gray-700 order-last sm:order-none w-full sm:w-auto text-center">
                                Page {page}
                            </p>

                            <Button
                                onClick={() => goToPage(page + 1)}
                                disabled={!hasNext || loading}
                                endIcon={<ChevronRight />}
                                sx={pageButtonSx}
                            >
                                Next
                            </Button>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
