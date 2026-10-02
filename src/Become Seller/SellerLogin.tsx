import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Paper,
    Avatar,
    Typography,
    InputAdornment,
    IconButton,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Fade,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import PasswordIcon from "@mui/icons-material/Password";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../State/Store";

import { sendLoginSignupOtp } from "../State/Authslice";
import { sellerLogin } from "../State/seller/sellerAuthSlice";
import { fetchSellerProfile } from "../State/seller/sellerSlice";

const RESEND_SECONDS = 30;
const DASHBOARD_ROUTE = "/seller"; // change if your dashboard route is different

interface SellerLoginFormProps {
    onLoginSuccess?: (jwt?: string) => void;
}

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const SellerLoginForm = ({ onLoginSuccess }: SellerLoginFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [formError, setFormError] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                        timerRef.current = null;
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
            password: "",
        },

        // OTP and password are only required after the OTP has been sent
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Enter a valid email address")
                .required("Email is required"),

            otp: otpSent
                ? Yup.string()
                      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
                      .required("OTP is required")
                : Yup.string(),

            password: otpSent
                ? Yup.string()
                      .min(6, "Password must be at least 6 characters")
                      .required("Password is required")
                : Yup.string(),
        }),

        onSubmit: async (values) => {
            if (!otpSent) {
                setFormError("Please send the OTP first, then enter OTP and password.");
                return;
            }

            setFormError("");
            setInfoMessage("");
            setLoggingIn(true);

            try {
                // Sends { email, otp, password } to the backend
                const data: any = await dispatch(
                    sellerLogin({
                        email: values.email,
                        otp: values.otp,
                        password: values.password,
                    })
                ).unwrap();

                // Adjust the field name to match your backend response
                const jwt: string | undefined = data?.jwt || data?.token;

                if (!jwt) {
                    setFormError("Login succeeded but no token was returned.");
                    return;
                }

                localStorage.setItem("sellerJwt", jwt);
                localStorage.setItem("sellerRegistered", "true");

                // Load the profile (don't block the redirect if it fails)
                try {
                    await dispatch(fetchSellerProfile(jwt)).unwrap();
                } catch (profileErr) {
                    console.warn("Profile fetch failed", profileErr);
                }

                if (onLoginSuccess) {
                    onLoginSuccess(jwt);
                } else {
                    navigate(DASHBOARD_ROUTE, { replace: true });
                }
            } catch (err: any) {
                setFormError(
                    typeof err === "string"
                        ? err
                        : err?.message || "Login failed. Please check your OTP and password."
                );
            } finally {
                setLoggingIn(false);
            }
        },
    });

    const handleSendOtp = async () => {
        setFormError("");
        setInfoMessage("");
        formik.setFieldTouched("email", true, false);

        // Validate directly with Yup (formik.errors can be stale right after validation)
        const emailValid = Yup.string()
            .email()
            .required()
            .isValidSync(formik.values.email);

        if (!emailValid) {
            formik.setFieldError("email", "Enter a valid email address");
            return;
        }

        setSendingOtp(true);
        try {
            await dispatch(sendLoginSignupOtp({ email: formik.values.email })).unwrap();
            setOtpSent(true);
            // clear any old values/touched state so errors don't flash on the new fields
            formik.setFieldValue("otp", "", false);
            formik.setFieldTouched("otp", false, false);
            formik.setFieldTouched("password", false, false);
            setInfoMessage(`OTP sent to ${formik.values.email}`);
            startResendTimer();
        } catch (err: any) {
            setFormError(
                typeof err === "string" ? err : err?.message || "Could not send OTP. Please try again."
            );
        } finally {
            setSendingOtp(false);
        }
    };

    // Lets the seller go back and use a different email
    const handleChangeEmail = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setResendTimer(0);
        setOtpSent(false);
        setFormError("");
        setInfoMessage("");
        formik.setFieldValue("otp", "", false);
        formik.setFieldValue("password", "", false);
        formik.setFieldTouched("otp", false, false);
        formik.setFieldTouched("password", false, false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
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
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5, textAlign: "center" }}
                        >
                            {otpSent
                                ? "Enter the OTP sent to your email and your password"
                                : "Enter your email to receive a one-time password"}
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
                            {/* Step 1: email */}
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
                                sx={fieldSx}
                            />

                            {/* Step 2: OTP + password (shown after OTP is sent) */}
                            {otpSent && (
                                <Fade in={otpSent}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                                        <TextField
                                            fullWidth
                                            name="otp"
                                            label="OTP"
                                            type="text"
                                            placeholder="Enter 6 digit OTP"
                                            autoComplete="one-time-code"
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
                                            sx={fieldSx}
                                        />

                                        <TextField
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PasswordIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showPassword ? "Hide password" : "Show password"
                                                            }
                                                            onClick={() => setShowPassword((s) => !s)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={fieldSx}
                                        />
                                    </Box>
                                </Fade>
                            )}

                            {/* Send / Resend OTP */}
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

                            {/* Login: only enabled after OTP is sent */}
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

                            {otpSent && (
                                <Button
                                    type="button"
                                    onClick={handleChangeEmail}
                                    disabled={loggingIn}
                                    sx={{ textTransform: "none", fontWeight: 500 }}
                                >
                                    Use a different email
                                </Button>
                            )}
                        </Box>
                    </form>
                </Paper>
            </Fade>
        </Box>
    );
};

export default SellerLoginForm;
