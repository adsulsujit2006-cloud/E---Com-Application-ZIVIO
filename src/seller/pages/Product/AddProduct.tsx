import { AddPhotoAlternate } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { uploadToCloudinary } from "../../../Util/uploadToCoudinary";
import { mainCategory } from "../../../data/category/mainCategory";

// ---- Design tokens ----
const palette = {
    pageBg: "#F6F7F5",
    surface: "#FFFFFF",
    border: "#DFE3DE",
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

// Local color options — MUI's own `colors` export is a palette object, not
// a list of { name, hex } items, so we define our own here.
const colors = [
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Green", hex: "#008000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Red", hex: "#FF0000" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Black", hex: "#000000" },
    { name: "Purple", hex: "#800080" },
    { name: "Navy Blue", hex: "#000080" },
    { name: "Maroon", hex: "#800000" },
    { name: "Peach", hex: "#FFDAB9" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Grey", hex: "#808080" },
    { name: "Teal", hex: "#008080" },
    { name: "Turquoise Blue", hex: "#00CED1" },
    { name: "Mustard", hex: "#FFDB58" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Cream", hex: "#FFFDD0" },
    { name: "Sea Green", hex: "#2E8B57" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Olive", hex: "#808000" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Lime Green", hex: "#32CD32" },
    { name: "Rust", hex: "#B7410E" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Burgundy", hex: "#800020" },
    { name: "Mauve", hex: "#E0B0FF" },
    { name: "Violet", hex: "#8F00FF" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Rose", hex: "#FF007F" },
    { name: "Coffee Brown", hex: "#6F4E37" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Taupe", hex: "#483C32" },
    { name: "Khaki", hex: "#C3B091" },
    { name: "Copper", hex: "#B87333" },
    { name: "Tan", hex: "#D2B48C" },
    { name: "Camel Brown", hex: "#C19A6B" },
    { name: "Champagne", hex: "#F7E7CE" },
    { name: "Fluorescent Green", hex: "#39FF14" },
    { name: "Grey Melange", hex: "#B2BEB5" },
    { name: "Bronze", hex: "#CD7F32" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Nude", hex: "#E3BC9A" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Metallic", hex: "#BCC6CC" },
    { name: "Steel", hex: "#71797E" },
    { name: "Off White", hex: "#FAF9F6" },
    { name: "Multi", hex: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)" },
    { name: "Assorted", hex: "linear-gradient(135deg, #f43f5e, #f59e0b, #10b981, #3b82f6, #8b5cf6)" },
    { name: "Skin", hex: "#F1C27D" },
];

export const sizes = [
    { name: "XS" },
    { name: "S" },
    { name: "M" },
    { name: "L" },
    { name: "XL" },
    { name: "XXL" },
    { name: "3XL" },
    { name: "4XL" },
];

const AddProduct = () => {
    const [uploadImage, setUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            Description: "",
            mrpPrice: "",
            sellingPrice: "",
            quantity: "",
            color: "",
            images: [] as string[],
            category: "",
            category2: "",
            category3: "",
            sizes: "",
        },

        onSubmit: async (values) => {
            setSubmitting(true);
            try {
                console.log(values);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setUploadError(null);

        try {

            setUploadingImage(true);

            const imageUrl = await uploadToCloudinary(file);

            console.log("Uploaded Image URL:", imageUrl);

            formik.setFieldValue("images", [
                ...formik.values.images,
                imageUrl,
            ]);

        } catch (error: any) {

            console.error("Image upload failed:", error);
            setUploadError(error?.message || "Image upload failed. Please try again.");

        } finally {

            setUploadingImage(false);

            // Reset input
            event.target.value = "";
        }
    };

    const handleRemoveImage = (index: number) => {
        const updateImages = [...formik.values.images];

        updateImages.splice(index, 1);

        formik.setFieldValue("images", updateImages);
    };

    return (
        <Box sx={{ backgroundColor: palette.pageBg, minHeight: "100%", py: { xs: 3, md: 6 } }}>
            <Box
                sx={{
                    maxWidth: "980px",
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
                        Add product
                    </Typography>
                    <Typography sx={{ fontSize: "0.92rem", color: palette.textMuted, mt: "4px" }}>
                        Fill in the details below to list a new product in your catalog.
                    </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>

                        {/* ---- Media ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel title="Photos" hint="Add at least one photo. The first image is used as the cover." />
                            <Box className="flex flex-wrap gap-4">

                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />

                                <label
                                    className="relative"
                                    htmlFor="fileInput"
                                >
                                    <Box
                                        sx={{
                                            width: "96px",
                                            height: "96px",
                                            cursor: "pointer",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "4px",
                                            border: `1.5px dashed ${palette.border}`,
                                            borderRadius: "10px",
                                            color: palette.textMuted,
                                            transition: "border-color 0.15s ease, color 0.15s ease",
                                            "&:hover": {
                                                borderColor: palette.accent,
                                                color: palette.accent,
                                            },
                                        }}
                                    >
                                        <AddPhotoAlternate fontSize="small" />
                                        <Typography sx={{ fontSize: "0.68rem" }}>Add photo</Typography>
                                    </Box>

                                    {uploadImage && (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                width: "96px",
                                                height: "96px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "rgba(255,255,255,0.75)",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <CircularProgress size={22} sx={{ color: palette.accent }} />
                                        </Box>
                                    )}

                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {formik.values.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative overflow-hidden"
                                            style={{
                                                width: "96px",
                                                height: "96px",
                                                minWidth: "96px",
                                                minHeight: "96px",
                                                flexShrink: 0,
                                                borderRadius: "10px",
                                                border: `1px solid ${palette.border}`,
                                            }}
                                        >
                                            <img
                                                src={image}
                                                alt={`ProductImage ${index + 1}`}
                                                style={{
                                                    width: "96px",
                                                    height: "96px",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                                onError={(e) => {
                                                    console.error("Image failed to load:", image);
                                                    (e.target as HTMLImageElement).src =
                                                        "https://via.placeholder.com/96?text=No+Image";
                                                }}
                                            />
                                            <IconButton
                                                onClick={() => handleRemoveImage(index)}
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 4,
                                                    right: 4,
                                                    outline: "none",
                                                    backgroundColor: "rgba(255,255,255,0.9)",
                                                    width: "22px",
                                                    height: "22px",
                                                    "&:hover": { backgroundColor: "#FFFFFF" },
                                                }}
                                            >
                                                <CloseIcon sx={{ fontSize: "0.9rem", color: palette.error }} />
                                            </IconButton>
                                        </div>
                                    ))}

                                </div>
                            </Box>

                            {uploadError && (
                                <Typography sx={{ width: "100%", color: palette.error, fontSize: "0.82rem", mt: 1.5 }}>
                                    {uploadError}
                                </Typography>
                            )}
                        </Grid>

                        <Grid size={{ xs: 12 }}><Divider sx={{ borderColor: palette.border }} /></Grid>

                        {/* ---- Details ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel title="Details" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                sx={fieldSx}
                                id="title"
                                name="title"
                                label="Name"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                                required />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                sx={fieldSx}
                                id="description"
                                name="Description"
                                label="Description"
                                value={formik.values.Description}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.Description && Boolean(formik.errors.Description)
                                }
                                helperText={formik.touched.Description && formik.errors.Description}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}><Divider sx={{ borderColor: palette.border }} /></Grid>

                        {/* ---- Pricing & stock ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel title="Pricing & stock" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <TextField
                                fullWidth
                                sx={fieldSx}
                                id="mrp_price"
                                name="mrpPrice"
                                label="MRP price"
                                type="number"
                                value={formik.values.mrpPrice}
                                onChange={formik.handleChange}
                                error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
                                helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <TextField
                                fullWidth
                                sx={fieldSx}
                                id="sellingPrice"
                                name="sellingPrice"
                                label="Selling price"
                                type="number"
                                value={formik.values.sellingPrice}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.sellingPrice &&
                                    Boolean(formik.errors.sellingPrice)
                                }
                                helperText={
                                    formik.touched.sellingPrice && formik.errors.sellingPrice
                                }
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <TextField
                                fullWidth
                                sx={fieldSx}
                                id="quantity"
                                name="quantity"
                                label="Quantity"
                                type="number"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                helperText={formik.touched.quantity && formik.errors.quantity}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}><Divider sx={{ borderColor: palette.border }} /></Grid>

                        {/* ---- Variants ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel title="Variants" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.color && Boolean(formik.errors.color)}
                                required
                            >
                                <InputLabel id="color-label">Color</InputLabel>
                                <Select
                                    labelId="color-label"
                                    id="color"
                                    name="color"
                                    value={formik.values.color}
                                    onChange={formik.handleChange}
                                    label="Color"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        colors.map((color, index) => (
                                            <MenuItem key={index} value={color.name}>
                                                <div className="flex gap-3 items-center">
                                                    <span
                                                        style={{ background: color.hex }}
                                                        className={`h-5 w-5 rounded-full flex-shrink-0 ${color.name === "White" || color.name === "Off White" ? "border" : ""}`}
                                                    />
                                                    <p>{color.name}</p>
                                                </div>
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {formik.touched.color && formik.errors.color && (
                                    <FormHelperText>{formik.errors.color}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.sizes && Boolean(formik.errors.sizes)}
                                required
                            >
                                <InputLabel id="sizes-label">Sizes</InputLabel>
                                <Select
                                    labelId="sizes-label"
                                    id="sizes"
                                    name="sizes"
                                    value={formik.values.sizes}
                                    onChange={formik.handleChange}
                                    label="Sizes"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        sizes.map((size, index) => (
                                            <MenuItem key={index} value={size.name}>
                                                {size.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {formik.touched.sizes && formik.errors.sizes && (
                                    <FormHelperText>{formik.errors.sizes}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12 }}><Divider sx={{ borderColor: palette.border }} /></Grid>

                        {/* ---- Category ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel title="Category" hint="Choose up to three levels to help buyers find this product." />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                required>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    label="Category"
                                >
                                    {
                                        mainCategory.map((item) => (
                                            <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {formik.touched.category && formik.errors.category && (
                                    <FormHelperText>{formik.errors.category}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.category2 && Boolean(formik.errors.category2)}
                                required>
                                <InputLabel id="category2-label">Second category</InputLabel>
                                <Select
                                    labelId="category2-label"
                                    id="category2"
                                    name="category2"
                                    value={formik.values.category2}
                                    onChange={formik.handleChange}
                                    label="Second category"
                                >
                                    {
                                        mainCategory.map((item) => (
                                            <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {formik.touched.category2 && formik.errors.category2 && (
                                    <FormHelperText>{formik.errors.category2}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.category3 && Boolean(formik.errors.category3)}
                                required>
                                <InputLabel id="category3-label">Third category</InputLabel>
                                <Select
                                    labelId="category3-label"
                                    id="category3"
                                    name="category3"
                                    value={formik.values.category3}
                                    onChange={formik.handleChange}
                                    label="Third category"
                                >
                                    {
                                        mainCategory.map((item) => (
                                            <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {formik.touched.category3 && formik.errors.category3 && (
                                    <FormHelperText>{formik.errors.category3}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {/* ---- Submit ---- */}
                        <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                            <Button
                                sx={{
                                    p: "13px",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    backgroundColor: palette.accent,
                                    "&:hover": { backgroundColor: palette.accentHover },
                                }}
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={submitting || uploadImage}
                            >
                                {submitting ? (
                                    <CircularProgress size={22} sx={{ color: "white" }} />
                                ) : (
                                    "Add product"
                                )}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default AddProduct;