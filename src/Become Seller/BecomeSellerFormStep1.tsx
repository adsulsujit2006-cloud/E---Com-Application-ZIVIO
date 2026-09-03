
import {
    Box,
    TextField,
    Typography,
    Paper,
    InputAdornment
} from "@mui/material";

import React from "react";

import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";


const BecomeSellerFormStep1 = ({ formik }: any) => {

    return (
        <Box sx={{ width: "100%" }}>

            {/* Heading */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "#222",
                        mb: 0.5
                    }}
                >
                    Contact Details
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#777"
                    }}
                >
                    Enter your mobile number and GSTIN to get started.
                </Typography>
            </Box>


            {/* Form Card */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 3 },
                    border: "1px solid #e5e5e5",
                    borderRadius: 3,
                    backgroundColor: "#ffffff"
                }}
            >

                <div className="space-y-6">

                    {/* Mobile */}
                    <TextField
                        fullWidth
                        name="mobile"
                        label="Mobile Number"
                        placeholder="Enter your 10-digit mobile number"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.mobile &&
                            Boolean(formik.errors.mobile)
                        }
                        helperText={
                            formik.touched.mobile &&
                            formik.errors.mobile
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon
                                        sx={{ color: "#777" }}
                                    />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "#fafafa"
                            }
                        }}
                    />


                    {/* GSTIN */}
                    <TextField
                        fullWidth
                        name="gstin"
                        label="GSTIN"
                        placeholder="Enter your GSTIN"
                        value={formik.values.gstin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.gstin &&
                            Boolean(formik.errors.gstin)
                        }
                        helperText={
                            formik.touched.gstin &&
                            formik.errors.gstin
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BusinessIcon
                                        sx={{ color: "#777" }}
                                    />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "#fafafa"
                            }
                        }}
                    />

                </div>

            </Paper>


            {/* Bottom Information */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 2,
                    px: 1
                }}
            >
                <BusinessIcon
                    sx={{
                        fontSize: 18,
                        color: "#999"
                    }}
                />

                <Typography
                    variant="caption"
                    sx={{
                        color: "#777"
                    }}
                >
                    Your contact details will be used for seller verification.
                </Typography>
            </Box>

        </Box>
    );
};

export default BecomeSellerFormStep1;
