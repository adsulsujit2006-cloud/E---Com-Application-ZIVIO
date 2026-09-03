
import {
    Box,
    Grid,
    TextField,
    Typography,
    Paper,
    InputAdornment
} from "@mui/material";

import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import PinDropIcon from "@mui/icons-material/PinDrop";


const BecomeSellerFormStep2 = ({ formik }: any) => {

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
                    Pickup Address
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#777"
                    }}
                >
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
                    backgroundColor: "#ffffff"
                }}
            >

                <Grid container spacing={3}>

                    {/* Name */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name &&
                                formik.errors.name
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon
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
                    </Grid>


                    {/* Mobile */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            name="mobile"
                            label="Mobile Number"
                            placeholder="Enter mobile number"
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
                    </Grid>


                    {/* Pin Code */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            name="pinCode"
                            label="PIN Code"
                            placeholder="Enter 6-digit PIN code"
                            value={formik.values.pinCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.pinCode &&
                                Boolean(formik.errors.pinCode)
                            }
                            helperText={
                                formik.touched.pinCode &&
                                formik.errors.pinCode
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PinDropIcon
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
                    </Grid>


                    {/* Address */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            name="address"
                            label="Complete Address"
                            placeholder="Enter house no, building, street, etc."
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.address &&
                                Boolean(formik.errors.address)
                            }
                            helperText={
                                formik.touched.address &&
                                formik.errors.address
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{
                                            alignSelf: "flex-start",
                                            mt: 1
                                        }}
                                    >
                                        <HomeIcon
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
                    </Grid>


                    {/* City */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            name="city"
                            label="City"
                            placeholder="Enter city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.city &&
                                Boolean(formik.errors.city)
                            }
                            helperText={
                                formik.touched.city &&
                                formik.errors.city
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityIcon
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
                    </Grid>


                    {/* State */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            name="state"
                            label="State"
                            placeholder="Enter state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.state &&
                                Boolean(formik.errors.state)
                            }
                            helperText={
                                formik.touched.state &&
                                formik.errors.state
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PublicIcon
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
                    </Grid>


                    {/* Locality */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name="locality"
                            label="Locality"
                            placeholder="Enter locality or area"
                            value={formik.values.locality}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.locality &&
                                Boolean(formik.errors.locality)
                            }
                            helperText={
                                formik.touched.locality &&
                                formik.errors.locality
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnIcon
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
                    </Grid>

                </Grid>

            </Paper>


            {/* Information */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 2,
                    px: 1
                }}
            >
                <LocationOnIcon
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
                    Please make sure your pickup address is accurate.
                </Typography>
            </Box>

        </Box>
    );
};

export default BecomeSellerFormStep2;
