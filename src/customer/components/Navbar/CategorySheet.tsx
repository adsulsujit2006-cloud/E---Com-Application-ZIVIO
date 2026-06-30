import React from "react";
import { Box } from "@mui/material";

import { menLevlTwo } from "../../../data/category/LevelTwo/menLevelTwo";
import { menLevlThree } from "../../../data/category/LevelThree/menLevelThree";

import { womenLevlTwo } from "../../../data/category/LevelTwo/WomeanLevelTwo";
import { womeanLevlThree } from "../../../data/category/LevelThree/WomeanLevelThree";
import { ElectronicsLevelTwo } from "../../../data/category/LevelTwo/ElectronicsLevelTwo";
import { ElectronicsLevelThree } from "../../../data/category/LevelThree/ElectronicsLevelThree";
import { BeautyLevelTwo } from "../../../data/category/LevelTwo/BeautyLevelTwo";
import { BeautyLevelThree } from "../../../data/category/LevelThree/BeautyLevelThree";
import { KidsLevlTwo } from "../../../data/category/LevelTwo/KidsLevelTwo";
import { KidsLevelThree } from "../../../data/category/LevelThree/KidsLevelThree";

const categoryTwo: { [key: string]: any[] } = {
    men: menLevlTwo,
    women: womenLevlTwo,
    electronics : ElectronicsLevelTwo,
    beauty:BeautyLevelTwo,
    kids:KidsLevlTwo
    
};

const categoryThree: { [key: string]: any[] } = {
    men: menLevlThree,
    women: womeanLevlThree,
    electronics : ElectronicsLevelThree,
    beauty:BeautyLevelThree,
    kids:KidsLevelThree
};

const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {

    const childCatrgory = (category: any, parentCategoryId: any) => {
        return category.filter(
            (child: any) => child.parentCategoryId === parentCategoryId
        );
    };

    return (
        <Box
            sx={{ zIndex: 2 }}
            className="bg-white shadow-lg lg:h-[500px] overflow-y-auto"
        >
            <div className="flex text-sm flex-wrap">
                {categoryTwo[selectedCategory]?.map((item:any,index) => (
                    <div
                        key={item.categoryId}
                        className={`p-8 lg:w-[20%] ${
                            index % 2 === 0 ? "bg-slate-50" : "bg-white"
                        }`}
                    >
                        <p className="text-primary-color mb-5 font-semibold">
                            {item.name}
                        </p>

                        <ul className="space-y-3">
                            {childCatrgory(
                                categoryThree[selectedCategory],
                                item.categoryId
                            ).map((item: any) => (
                                <div key={item.categoryId}>
                                    <li
                                        className="hover:text-primary-color cursor-pointer"
                                        onClick={() => setShowSheet(false)}
                                    >
                                        {item.name}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Box>
    );
};

export default CategorySheet;