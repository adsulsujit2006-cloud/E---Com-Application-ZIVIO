import React from "react";
import TransactionTable from "./TransactionTable";
import { Box, Typography } from "@mui/material";

const Transaction = () => {
    return (
        <Box sx={{ backgroundColor: "#F6F7F5", minHeight: "100%", py: { xs: 3, md: 6 }, px: { xs: 2, md: 0 } }}>
            <Box sx={{ maxWidth: "1100px", mx: "auto" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.6rem", color: "#1B1F1C", mb: 0.5, textAlign: "center" }}>
                    All transaction details
                </Typography>
                <Typography sx={{ fontSize: "0.92rem", color: "#5B645D", mb: 4, textAlign: "center" }}>
                    A record of every payment received and refunded across your orders.
                </Typography>
                <TransactionTable />
            </Box>
        </Box>
    );
};

export default Transaction;