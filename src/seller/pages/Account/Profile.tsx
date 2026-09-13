import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useFormik } from "formik";
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

    const formik = useFormik({
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

        onSubmit: async (values) => {
            setSaving(true);
            try {
                console.log(values);
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

                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                        {/* ---- Photo + identity ---- */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Box sx={{ position: "relative" }}>
                                <Avatar
                                    src={formik.values.avatar || undefined}
                                    sx={{
                                        width: 88,
                                        height: 88,
                                        backgroundColor: palette.accent,
                                        fontSize: "1.8rem",
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
                                />
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="phone"
                                    name="phone"
                                    label="Phone number"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
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
                                />
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id="gstin"
                                    name="gstin"
                                    label="GSTIN"
                                    value={formik.values.gstin}
                                    onChange={formik.handleChange}
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
        </Box>
    );
};

export default Profile;