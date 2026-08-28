import React, { useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
    Box,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

const Product = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    const handleSortChange = (event: any) => {
        setSort(event.target.value);
    };

    const handlePageChange = (value: number) => {
        setPage(value);
    };

    return (
        <div className="-z-10 mt-10">
            <div>
                <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
                    Sarees
                </h1>
            </div>

            <div className="lg:flex">

                <section className="filter_section hidden lg:block w-[20%]">
                    <FilterSection />
                </section>

                <div className="w-full lg:w-[80%] space-y-5">

                    <div className="flex justify-between items-center px-9 h-[40px]">

                        <div className="relative w-[50%]">

                            {!isLarge && (
                                <IconButton>
                                    <FilterAlt />
                                </IconButton>
                            )}

                            {!isLarge && (
                                <Box>
                                    <FilterSection />
                                </Box>
                            )}

                        </div>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl size="small" sx={{ width: "200px" }}>

                                <InputLabel id="demo-simple-select-label">
                                    Sort
                                </InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sort}
                                    label="Sort"
                                    onChange={handleSortChange}
                                >
                                    <MenuItem value={"price-low"}>
                                        Price: Low to High
                                    </MenuItem>

                                    <MenuItem value={"price-high"}>
                                        Price: High to Low
                                    </MenuItem>

                                    <MenuItem value={"top-rating"}>
                                        Customer Rating
                                    </MenuItem>

                                    <MenuItem value={"better-discount"}>
                                        Better Discount
                                    </MenuItem>
                                </Select>

                            </FormControl>
                        </Box>

                    </div>

                    <Divider />

                    <section className="product_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">

                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                            (item, index) => (
                                <ProductCard key={index} />
                            )
                        )}

                    </section>

                    <div className="flex justify-center py-10">

                        <Pagination
                            onChange={(event, value) =>
                                handlePageChange(value)
                            }
                            count={10}
                            page={page}
                            variant="outlined"
                            color="primary"
                        />

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Product;