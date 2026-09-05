
import React from "react";
import { InputAdornment, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";

const SellerLoginForm = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Enter a valid email address")
                .required("Email is required"),

            otp: Yup.string()
                .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
                .required("OTP is required"),
        }),

        onSubmit: (values) => {
            console.log("Form submitted");
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>

          <div>
            <h1 className="text-center font-bold text-xl pb-5">Login As Seller</h1>
              <div className="space-y-5">

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

                    error={
                        formik.touched.email &&
                        Boolean(formik.errors.email)
                    }

                    helperText={
                        formik.touched.email &&
                        formik.errors.email
                    }

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}

                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />

                {/* OTP */}
                {true && 
                <div className="space-y-2">
                    <TextField
                    fullWidth
                    name="otp"
                    label="OTP"
                    type="text"
                    placeholder="Enter 6 digit OTP"

                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                    inputProps={{
                        maxLength: 6,
                        inputMode: "numeric",
                    }}

                    error={
                        formik.touched.otp &&
                        Boolean(formik.errors.otp)
                    }

                    helperText={
                        formik.touched.otp &&
                        formik.errors.otp
                    }

                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />
                    </div>}

                {/* Submit Button */}
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                        height: "50px",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: 600,
                    }}
                >
                    Login
                </Button>

            </div>
          </div>

        </form>
    );
};

export default SellerLoginForm;
