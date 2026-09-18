import React, { useState } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadToCloudinary } from "../../../Util/uploadToCoudinary";

const palette = {
    pageBg: "#F6F7F5",
    surface: "#FFFFFF",
    border: "#E3E6E1",
    text: "#1B1F1C",
    textMuted: "#5B645D",
    accent: "#1F4B43",
    accentHover: "#163A33",
    error: "#C4433A",
};

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: palette.surface,
        "& fieldset": { borderColor: palette.border },
        "&:hover fieldset": { borderColor: palette.accent },
        "&.Mui-focused fieldset": { borderColor: palette.accent, borderWidth: "1.5px" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: palette.accent },
};

interface ProfileFormValues {
    avatar: string;
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    gstin: string;
    address: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Full name is required"),
    email: Yup.string().trim().email("Enter a valid email address").required("Email is required"),
    phone: Yup.string()
        .trim()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
        .required("Phone number is required"),
    businessName: Yup.string().trim(),
    gstin: Yup.string()
        .trim()
        .matches(/^[0-9A-Z]{15}$/, "GSTIN must be 15 characters (numbers and capital letters)")
        .notRequired(),
    address: Yup.string().trim(),
    currentPassword: Yup.string().when("newPassword", {
        is: (val: string) => Boolean(val),
        then: (schema) => schema.required("Enter your current password to set a new one"),
        otherwise: (schema) => schema.notRequired(),
    }),
    newPassword: Yup.string()
        .test("min-length", "Password must be at least 8 characters", (val) => !val || val.length >= 8)
        .notRequired(),
    confirmPassword: Yup.string().when("newPassword", {
        is: (val: string) => Boolean(val),
        then: (schema) =>
            schema
                .oneOf([Yup.ref("newPassword")], "Passwords do not match")
                .required("Confirm your new password"),
        otherwise: (schema) => schema.notRequired(),
    }),
});

const SectionLabel = ({ title, hint }: { title: string; hint?: string }) => (
    <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: palette.text }}>
            {title}
        </Typography>
        {hint && (
            <Typography sx={{ fontSize: "0.82rem", color: palette.textMuted, mt: "2px" }}>
                {hint}
            </Typography>
        )}
    </Box>
);

const Profile = () => {
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });

    const formik = useFormik<ProfileFormValues>({
        initialValues: {
            avatar: "",
            fullName: "",
            email: "",
            phone: "",
            businessName: "",
            gstin: "",
            address: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm, setFieldValue }) => {
            setSaving(true);
            try {
                console.log(values);
                // Replace with your actual API call, e.g.:
                // await api.put("/profile", values);

                setSnackbar({ open: true, message: "Changes saved successfully.", severity: "success" });

                // Clear password fields after a successful save; keep everything else.
                resetForm({
                    values: {
                        ...values,
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    },
                });
                setFieldValue("avatar", values.avatar);
            } catch (error) {
                console.error("Profile save failed:", error);
                setSnackbar({ open: true, message: "Couldn't save changes. Please try again.", severity: "error" });
            } finally {
                setSaving(false);
            }
        },
    });

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setUploadError(null);

        try {
            setUploadingAvatar(true);

            const imageUrl = await uploadToCloudinary(file);

            formik.setFieldValue("avatar", imageUrl);
        } catch (error: any) {
            console.error("Avatar upload failed:", error);
            setUploadError(error?.message || "Photo upload failed. Please try again.");
        } finally {
            setUploadingAvatar(false);
            event.target.value = "";
        }
    };

    return (
        <Box sx={{ backgroundColor: palette.pageBg, minHeight: "100%", py: { xs: 3, md: 6 } }}>
            <Box
                sx={{
                    maxWidth: "780px",
                    mx: "auto",
                    backgroundColor: palette.surface,
                    border: `1px solid ${palette.border}`,
                    borderRadius: "14px",
                    px: { xs: 3, md: 5 },
                    py: { xs: 4, md: 5 },
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.6rem", color: palette.text, letterSpacing: "-0.01em" }}>
                        Account
                    </Typography>
                    <Typography sx={{ fontSize: "0.92rem", color: palette.textMuted, mt: "4px" }}>
                        Manage your personal details, business info, and password.
                    </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit} noValidate>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                        {/* ---- Photo + identity ---- */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                            <Box sx={{ position: "relative" }}>
                                <Avatar
                                    src={formik.values.avatar || undefined}
                                    sx={{
                                        width: 88,
                                        height: 88,
                                        backgroundColor: palette.accent,
                                        fontSize: "1.8rem",
                                        border: `3px solid ${palette.pageBg}`,
                                        boxShadow: `0 0 0 1px ${palette.border}`,
                                    }}
                                >
                                    {formik.values.fullName ? formik.values.fullName[0].toUpperCase() : "S"}
                                </Avatar>

                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleAvatarChange}
                                />
                                <label htmlFor="avatarInput">
                                    <IconButton
                                        component="span"
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            bottom: -2,
                                            right: -2,
                                            backgroundColor: palette.accent,
                                            color: "#FFFFFF",
                                            width: 30,
                                            height: 30,
                                            border: `2px solid ${palette.surface}`,
                                            "&:hover": { backgroundColor: palette.accentHover },
                                        }}
                                    >
                                        {uploadingAvatar ? (
                                            <CircularProgress size={14} sx={{ color: "#FFFFFF" }} />
                                        ) : (
                                            <CameraAltOutlinedIcon sx={{ fontSize: "0.95rem" }} />
                                        )}
                                    </IconButton>
                                </label>
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: "1.05rem", color: palette.text }}>
                                    {formik.values.fullName || "Your name"}
                                </Typography>
                                <Typography sx={{ fontSize: "0.85rem", color: palette.textMuted }}>
                                    {formik.values.email || "your.email@example.com"}
                                </Typography>
                            </Box>
                        </Box>

                        {uploadError && (
                            <Typography sx={{ color: palette.error, fontSize: "0.82rem", mt: -2 }}>
                                {uploadError}
                            </Typography>
                        )}

                        <Divider sx={{ borderColor: palette.border }} />

                        {/* ---- Personal details ---- */}
                        <Box>
                            <SectionLabel title="Personal details" />
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="fullName"
                                    name="fullName"
                                    label="Full name"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="phone"
                                    name="phone"
                                    label="Phone number"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                                <TextField
                                    fullWidth
                                    sx={{ ...fieldSx, gridColumn: { md: "1 / -1" } }}
                                    id="email"
                                    name="email"
                                    label="Email address"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ borderColor: palette.border }} />

                        {/* ---- Business details ---- */}
                        <Box>
                            <SectionLabel title="Business details" hint="Shown on invoices and used for payouts." />
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="businessName"
                                    name="businessName"
                                    label="Business name"
                                    value={formik.values.businessName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                                    helperText={formik.touched.businessName && formik.errors.businessName}
                                />
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="gstin"
                                    name="gstin"
                                    label="GSTIN"
                                    value={formik.values.gstin}
                                    onChange={(e) => formik.setFieldValue("gstin", e.target.value.toUpperCase())}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.gstin && Boolean(formik.errors.gstin)}
                                    helperText={formik.touched.gstin && formik.errors.gstin}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    sx={{ ...fieldSx, gridColumn: { md: "1 / -1" } }}
                                    id="address"
                                    name="address"
                                    label="Business address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ borderColor: palette.border }} />

                        {/* ---- Password ---- */}
                        <Box>
                            <SectionLabel title="Password" hint="Leave blank if you don't want to change it." />
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                                <TextField
                                    fullWidth
                                    sx={{ ...fieldSx, gridColumn: { md: "1 / -1" } }}
                                    id="currentPassword"
                                    name="currentPassword"
                                    label="Current password"
                                    type="password"
                                    value={formik.values.currentPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                    helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                />
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="newPassword"
                                    name="newPassword"
                                    label="New password"
                                    type="password"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                />
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm new password"
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={saving || uploadingAvatar}
                                sx={{
                                    px: 4,
                                    py: 1.3,
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    backgroundColor: palette.accent,
                                    "&:hover": { backgroundColor: palette.accentHover },
                                }}
                            >
                                {saving ? (
                                    <CircularProgress size={22} sx={{ color: "white" }} />
                                ) : (
                                    "Save changes"
                                )}
                            </Button>
                        </Box>

                    </Box>
                </form>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    sx={{ borderRadius: "8px" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Profile;
