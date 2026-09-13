import React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";
import TransactionTable from "../Transaction/TransactionTable";

const palette = {
    pageBg: "#F6F7F5",
    surface: "#FFFFFF",
    border: "#E3E6E1",
    text: "#1B1F1C",
    textMuted: "#5B645D",
    accent: "#1F4B43",
};

const Payment = () => {
    return (
        <Box sx={{ backgroundColor: palette.pageBg, minHeight: "100%", py: { xs: 3, md: 5 }, px: { xs: 2, md: 0 } }}>
            <Box sx={{ maxWidth: "900px", mx: "auto" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.6rem", color: palette.text, mb: 3 }}>
                    Payments
                </Typography>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: "14px",
                        border: `1px solid ${palette.border}`,
                        p: { xs: 3, md: 4 },
                    }}
                >
                    <Typography sx={{ color: palette.textMuted, fontSize: "0.9rem", fontWeight: 500 }}>
                        Total earning
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "2.2rem", color: palette.text, mt: "4px" }}>
                        ₹5,000
                    </Typography>

                    <Divider sx={{ my: 3, borderColor: palette.border }} />

                    <Typography sx={{ color: palette.textMuted, fontSize: "0.9rem" }}>
                        Last payment:{" "}
                        <Box component="span" sx={{ color: palette.text, fontWeight: 600 }}>
                            ₹0
                        </Box>
                    </Typography>
                </Card>

                <Box sx={{ mt: 5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: palette.text, mb: 2 }}>
                        Transactions
                    </Typography>
                    <TransactionTable />
                </Box>

            </Box>
        </Box>
    );
};

export default Payment;