import {
    Box,
    Grid,
    TextField,
    Typography,
    Paper,
    InputAdornment,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import PinDropIcon from "@mui/icons-material/PinDrop";

interface BecomeSellerFormStep2Props {
    formik: any;
}

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        backgroundColor: "#fafafa",
    },
};

const BecomeSellerFormStep2: React.FC<BecomeSellerFormStep2Props> = ({ formik }) => {
    // Small helper so every field reads from formik.values.pickupAddress.*
    const field = (key: string) => ({
        name: `pickupAddress.${key}`,
        value: formik.values.pickupAddress[key],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: Boolean(
            formik.touched.pickupAddress?.[key] && formik.errors.pickupAddress?.[key]
        ),
        helperText:
            formik.touched.pickupAddress?.[key] && formik.errors.pickupAddress?.[key],
    });

    const adornment = (icon: React.ReactNode, top = false) => (
        <InputAdornment
            position="start"
            sx={top ? { alignSelf: "flex-start", mt: 1 } : undefined}
        >
            {icon}
        </InputAdornment>
    );

    return (
        <Box sx={{ width: "100%" }}>
            {/* Heading */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#222", mb: 0.5 }}>
                    Pickup Address
                </Typography>
                <Typography variant="body2" sx={{ color: "#777" }}>
                    Enter your pickup and contact details carefully.
                </Typography>
            </Box>

            {/* Form Card */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 3 },
                    border: "1px solid #e5e5e5",
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                }}
            >
                <Grid container spacing={3}>
                    {/* Name */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...field("name")}
                            slotProps={{
                                input: {
                                    startAdornment: adornment(<PersonIcon sx={{ color: "#777" }} />),
                                },
                            }}
                            sx={fieldSx}
                        />
                    </Grid>

                    {/* Mobile */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            placeholder="Enter mobile number"
                            {...field("mobile")}
                            slotProps={{
                                input: {
                                    startAdornment: adornment(<PhoneIcon sx={{ color: "#777" }} />),
                                },
                                htmlInput: { maxLength: 10, inputMode: "numeric" },
                            }}
                            sx={fieldSx}
                        />
                    </Grid>

                    {/* Pin Code */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="PIN Code"
                            placeholder="Enter 6-digit PIN code"
                            {...field("pinCode")}
                            slotProps={{
                                input: {
                                    startAdornment: adornment(<PinDropIcon sx={{ color: "#777" }} />),
                                },
                                htmlInput: { maxLength: 6, inputMode: "numeric" },
                            }}
                            sx={fieldSx}
                        />
                    </Grid>

                    {/* Address */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Complete Address"
                            placeholder="Enter house no, building, street, etc."
                            {...field("address")}
                            slotProps={{
                                input: {
                                    startAdornment: adornment(<HomeIcon sx={{ color: "#777" }} />, true),
                                },
                            }}
                            sx={fieldSx}
                        />
                    </Grid>

                    {/* City */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="City"
                            placeholder="Enter city"
                            {...field("city")}
                            slotProps={{
                                input: {
                                    startAdornment: adornment(<LocationCityIcon sx={{ color: "#777" }} />),
                                },
                            }}
                            sx={fieldSx}
                        />
                    </Grid>

                    {/* State */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="State"
                            placeholder="Enter state"
                            {...field("state")}
                            slotProps={{
                                input: {
                                    startAdornment: adornment(<PublicIcon sx={{ color: "#777" }} />),
                                },
                            }}
                            sx={fieldSx}
                        />
                    </Grid>

                    {/* Locality */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Locality"
                            placeholder="Enter locality or area"
                            {...field("locality")}
                            slotProps={{
                                input: {
                                    startAdornment: adornment(<LocationOnIcon sx={{ color: "#777" }} />),
                                },
                            }}
                            sx={fieldSx}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Information */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, px: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: "#999" }} />
                <Typography variant="caption" sx={{ color: "#777" }}>
                    Please make sure your pickup address is accurate.
                </Typography>
            </Box>
        </Box>
    );
};

export default BecomeSellerFormStep2;