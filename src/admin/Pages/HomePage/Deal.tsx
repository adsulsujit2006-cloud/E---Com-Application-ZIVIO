import { Button } from "@mui/material";
import React, { useState } from "react";
import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable";
import CreateDealForm from "./CreateDealForm";

const tabs = [
    "Deals",
    "Category",
    "Create Deal"
]

const Deal = () => {
    const [activeTab, setActiveDeal] = useState("Deals")
    return (
        <div>
            <div className="flex gap-4">
                {tabs.map((item) => (
                    <Button
                        key={item}
                        variant={activeTab === item ? "contained" : "outlined"}
                        onClick={() => setActiveDeal(item)}
                    >
                        {item}
                    </Button>
                ))}
            </div>
            <div className="mt-5">
                {activeTab == "Deals" ? <DealTable /> : activeTab == "Category" ? <DealCategoryTable />
                    : <div className="mt-5 flex-col justify-center items-center h-[70vh]">
                        <CreateDealForm /> </div>}
            </div>
        </div>
    )
}

export default Deal