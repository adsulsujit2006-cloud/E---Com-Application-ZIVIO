import { TextField, Typography, InputAdornment, Paper } from "@mui/material";
import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

interface BecomeSellerFormStep4Props {
    formik: any;
}

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "#fafafa",
    },
};

const BecomeSellerFormStep4: React.FC<BecomeSellerFormStep4Props> = ({ formik }) => {
    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="mb-6">
                <Typography variant="h5" fontWeight="700" className="text-gray-800">
                    Business & Seller Details
                </Typography>
                <Typography variant="body2" className="text-gray-500 mt-1">
                    Enter your business and personal details to complete your seller account.
                </Typography>
            </div>

            {/* Form Card */}
            <Paper elevation={0} className="p-6 rounded-2xl border border-gray-200 bg-white">
                <div className="space-y-5">
                    {/* Business Name */}
                    <TextField
                        fullWidth
                        name="businessDetails.businessName"
                        label="Business Name"
                        placeholder="Enter your business name"
                        value={formik.values.businessDetails.businessName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                            formik.touched.businessDetails?.businessName &&
                                formik.errors.businessDetails?.businessName
                        )}
                        helperText={
                            formik.touched.businessDetails?.businessName &&
                            formik.errors.businessDetails?.businessName
                        }
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BusinessIcon className="text-gray-500" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={fieldSx}
                    />

                    {/* Seller Name */}
                    <TextField
                        fullWidth
                        name="sellerName"
                        label="Seller Name"
                        placeholder="Enter your full name"
                        value={formik.values.sellerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.sellerName && formik.errors.sellerName)}
                        helperText={formik.touched.sellerName && formik.errors.sellerName}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon className="text-gray-500" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={fieldSx}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="example@gmail.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon className="text-gray-500" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={fieldSx}
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter a strong password (min 8 characters)"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon className="text-gray-500" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={fieldSx}
                    />
                </div>
            </Paper>

            {/* Bottom Information */}
            <div className="flex items-center gap-2 px-2">
                <LockIcon fontSize="small" className="text-gray-400" />
                <Typography variant="caption" className="text-gray-500">
                    Your information is securely stored and will only be used for seller
                    verification.
                </Typography>
            </div>
        </div>
    );
};

export default BecomeSellerFormStep4;