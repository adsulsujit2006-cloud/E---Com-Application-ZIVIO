import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { teal } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";

import { colors } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/Price";
import { discount } from "../../../data/Filter/Discount";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpandColor = () => {
    setExpandColor(!expandColor);
  };

  const updateFilter = (e:any) => {
    const {value,name} = e.target;
    if(value){
      searchParams.set(name,value);
    }else{
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };
  const clearAllFilters = () => {
  console.log("clear all filters", searchParams);

  const params = new URLSearchParams(searchParams);

  params.forEach((value: any, key: any) => {
    params.delete(key);
  });

  setSearchParams(params);
};

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>

        <Button 
          size="small"
          className="text-teal-600 cursor-pointer font-semibold"
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </div>

      <Divider />

      <div className="px-9 space-y-6">
        {/* Color Filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>

            <RadioGroup
              className="text-2xl"
              aria-labelledby="color"
              defaultValue=""
              name="color"
              onChange={updateFilter}
            >
              {colors
                .slice(0, expandColor ? colors.length : 5)
                .map((item) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.name}
                    control={<Radio />}
                    label={
                      <div className="flex items-center gap-3">
                        <p>{item.name}</p>

                        <span
                          className={`h-5 w-5 rounded-full ${item.name === "White"
                              ? "border border-gray-400"
                              : ""
                            }`}
                          style={{
                            backgroundColor: item.hex,
                          }}
                        ></span>
                      </div>
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>

          <div>
            <Button
              onClick={handleExpandColor}
              className="text-primary-color cursor-pointer hover:text-teal-900 flex items-center"
            >
              {expandColor ? "Hide" : `+${colors.length - 5} more`}
            </Button>
          </div>
        </section>

        <Divider />

        {/* Price Filter */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>

            <RadioGroup
              name="price"
              aria-labelledby="price"
              defaultValue=""
              onChange={updateFilter}
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>

        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="brand">
              Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilter}
              aeia-labelledby="brand"
              defaultValue="">
              {discount.map((item, index) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>

        </section>

      </div>
    </div>
  );
};

export default FilterSection;