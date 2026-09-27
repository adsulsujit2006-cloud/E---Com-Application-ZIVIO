import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Paper,
    Avatar,
    Typography,
    InputAdornment,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Fade,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../State/Store";

import { sendLoginSignupOtp } from "../State/Authslice";
import { sellerLogin } from "../State/seller/sellerAuthSlice";
import { fetchSellerProfile } from "../State/seller/sellerSlice";

const RESEND_SECONDS = 30;

const SellerLoginForm = () => {
    const dispatch = useAppDispatch();

    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [formError, setFormError] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startResendTimer = () => {
        setResendTimer(RESEND_SECONDS);
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    if (timerRef.current !== null) {
                        clearInterval(timerRef.current);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Enter a valid email address")
                .required("Email is required"),

            otp: otpSent
                ? Yup.string()
                      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
                      .required("OTP is required")
                : Yup.string(),
        }),

        onSubmit: (values) => {
            if (!otpSent) {
                setFormError("Please send and enter the OTP before logging in.");
                return;
            }

            setFormError("");
            setLoggingIn(true);

            dispatch(sellerLogin(values))
                .unwrap()
                .then((data) => {
                    if (data?.jwt) {
                        dispatch(fetchSellerProfile(data.jwt));
                    }
                })
                .catch((err) => {
                    setFormError(
                        typeof err === "string" ? err : "Login failed. Please check your OTP and try again."
                    );
                })
                .finally(() => setLoggingIn(false));
        },
    });

    const handleSendOtp = async () => {
        setFormError("");
        setInfoMessage("");

        const emailError = await formik.validateField("email");
        formik.setFieldTouched("email", true, false);

        if (!formik.values.email || (formik.errors.email && !otpSent)) {
            return;
        }

        setSendingOtp(true);
        dispatch(sendLoginSignupOtp({ email: formik.values.email }))
            .unwrap()
            .then(() => {
                setOtpSent(true);
                setInfoMessage(`OTP sent to ${formik.values.email}`);
                startResendTimer();
            })
            .catch((err) => {
                setFormError(
                    typeof err === "string" ? err : "Could not send OTP. Please try again."
                );
            })
            .finally(() => setSendingOtp(false));
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
            }}
        >
            <Fade in timeout={500}>
                <Paper
                    elevation={12}
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        p: { xs: 3, sm: 5 },
                        borderRadius: "20px",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                width: 56,
                                height: 56,
                                mb: 1.5,
                                boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                            }}
                        >
                            <StorefrontIcon fontSize="medium" />
                        </Avatar>
                        <Typography variant="h5" fontWeight={700}>
                            Seller Login
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Sign in with your email using a one-time password
                        </Typography>
                    </Box>

                    {formError && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
                            {formError}
                        </Alert>
                    )}
                    {infoMessage && !formError && (
                        <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
                            {infoMessage}
                        </Alert>
                    )}

                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="example@gmail.com"
                                disabled={otpSent}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                                }}
                            />

                            {otpSent && (
                                <Fade in={otpSent}>
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
                                        error={formik.touched.otp && Boolean(formik.errors.otp)}
                                        helperText={formik.touched.otp && formik.errors.otp}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlineIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                                        }}
                                    />
                                </Fade>
                            )}

                            <Button
                                onClick={handleSendOtp}
                                fullWidth
                                type="button"
                                variant={otpSent ? "outlined" : "contained"}
                                disabled={sendingOtp || (otpSent && resendTimer > 0)}
                                sx={{
                                    height: "48px",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "15px",
                                    fontWeight: 600,
                                }}
                            >
                                {sendingOtp ? (
                                    <CircularProgress size={22} color="inherit" />
                                ) : otpSent ? (
                                    resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"
                                ) : (
                                    "Send OTP"
                                )}
                            </Button>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={!otpSent || loggingIn}
                                sx={{
                                    height: "50px",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    boxShadow: "0 6px 16px rgba(99,102,241,0.35)",
                                }}
                            >
                                {loggingIn ? <CircularProgress size={24} color="inherit" /> : "Login"}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Fade>
        </Box>
    );
};

export default SellerLoginForm;
