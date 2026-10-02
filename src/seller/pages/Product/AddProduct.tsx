import { AddPhotoAlternate } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import React, { useMemo, useState } from "react";
import { uploadToCloudinary } from "../../../Util/uploadToCoudinary";
import { mainCategory } from "../../../data/category/mainCategory";
import { useAppDispatch } from "../../../State/Store";
import { createProduct } from "../../../State/seller/sellerProductSlice";
import { AllLevelTwoCategories } from "../../../data/category/LevelTwo/LevelTwoCategory";
import { AllLevelThreeCategories } from "../../../data/category/LevelThree/LevelThreeCategory";

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

// ---- Extra product attributes ----
// `name` must match the field names in your Java entity / request DTO exactly
// (including the spellings "wavePAttern" and "netQuentity").
const attributeFields: { name: string; label: string; placeholder: string }[] = [
    { name: "sleeveLength", label: "Sleeve length", placeholder: "e.g. Short sleeves" },
    { name: "topType", label: "Top type", placeholder: "e.g. Kurta" },
    { name: "topPattern", label: "Top pattern", placeholder: "e.g. Floral print" },
    { name: "neck", label: "Neck", placeholder: "e.g. Round neck" },
    { name: "topShape", label: "Top shape", placeholder: "e.g. Straight" },
    { name: "topLength", label: "Top length", placeholder: "e.g. Knee length" },
    { name: "bottomType", label: "Bottom type", placeholder: "e.g. Palazzo" },
    { name: "bottomPattern", label: "Bottom pattern", placeholder: "e.g. Solid" },
    { name: "bottomClosure", label: "Bottom closure", placeholder: "e.g. Elastic waist" },
    { name: "waistband", label: "Waistband", placeholder: "e.g. Elasticated" },
    { name: "weaveType", label: "Weave type", placeholder: "e.g. Regular" },
    { name: "wavePAttern", label: "Wave pattern", placeholder: "e.g. Zig-zag" },
    { name: "ornamentation", label: "Ornamentation", placeholder: "e.g. Embroidery" },
    { name: "designStyling", label: "Design styling", placeholder: "e.g. Regular" },
    { name: "packageBottom", label: "Package bottom", placeholder: "e.g. 1 bottom" },
    { name: "netQuentity", label: "Net quantity", placeholder: "e.g. 1" },
];

// ---- Validation ----
const validate = (values: any) => {
    const errors: Record<string, string> = {};
    if (!values.title.trim()) errors.title = "Name is required";
    if (!values.description.trim()) errors.description = "Description is required";
    if (!values.mrpPrice) errors.mrpPrice = "MRP is required";
    if (!values.sellingPrice) errors.sellingPrice = "Selling price is required";
    if (
        values.mrpPrice &&
        values.sellingPrice &&
        Number(values.sellingPrice) > Number(values.mrpPrice)
    ) {
        errors.sellingPrice = "Selling price cannot be more than MRP";
    }
    if (!values.quantity) errors.quantity = "Quantity is required";
    if (!values.color) errors.color = "Select a color";
    if (values.sizes.length === 0) errors.sizes = "Select at least one size";
    if (!values.category) errors.category = "Select a category";
    if (!values.category2) errors.category2 = "Select a second category";
    if (!values.category3) errors.category3 = "Select a third category";
    return errors;
};

const AddProduct = () => {
    const [uploadImage, setUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            mrpPrice: "",
            sellingPrice: "",
            quantity: "",
            color: "",
            images: [] as string[],
            category: "",
            category2: "",
            category3: "",
            sizes: [] as string[], // multiple sizes

            // ---- Extra product attributes (all optional) ----
            sleeveLength: "",
            topType: "",
            topPattern: "",
            neck: "",
            bottomClosure: "",
            ornamentation: "",
            weaveType: "",
            topShape: "",
            bottomType: "",
            designStyling: "",
            topLength: "",
            bottomPattern: "",
            waistband: "",
            wavePAttern: "",
            packageBottom: "",
            netQuentity: "",
        },
        validate,

        onSubmit: async (values) => {
            if (values.images.length === 0) {
                setUploadError("Add at least one photo");
                return;
            }

            setSubmitting(true);
            let saved = false;

            try {
                const request = {
                    ...values,
                    mrpPrice: Number(values.mrpPrice),
                    sellingPrice: Number(values.sellingPrice),
                    quantity: Number(values.quantity),
                    // stored in DB as "S,M,L"
                    sizes: values.sizes.join(","),
                };

                console.log("Product request:", request);

                await dispatch(
                    createProduct({ request, jwt: localStorage.getItem("jwt") })
                ).unwrap();

                saved = true;
                alert("Product added successfully");

                // Refresh the page automatically after a successful save
                window.location.reload();
            } catch (error: any) {
                console.error("Create product failed:", error);
                alert(typeof error === "string" ? error : "Failed to add product");
            } finally {
                // On success keep the loader running until the reload happens
                if (!saved) setSubmitting(false);
            }
        },
    });

    const filteredLevelTwo = useMemo(() => {
        if (!formik.values.category) return [];
        return AllLevelTwoCategories.filter(
            (item) => item.parentCategoryId === formik.values.category
        );
    }, [formik.values.category]);

    const filteredLevelThree = useMemo(() => {
        if (!formik.values.category2) return [];
        return AllLevelThreeCategories.filter(
            (item) => item.parentCategoryId === formik.values.category2
        );
    }, [formik.values.category2]);

    const handleMainCategoryChange = (event: { target: { value: unknown } }) => {
        formik.setFieldValue("category", event.target.value);
        formik.setFieldValue("category2", "");
        formik.setFieldValue("category3", "");
    };

    const handleCategory2Change = (event: { target: { value: unknown } }) => {
        formik.setFieldValue("category2", event.target.value);
        formik.setFieldValue("category3", "");
    };

    // Multiple sizes: MUI gives an array (or a comma string on autofill)
    const handleSizesChange = (event: { target: { value: unknown } }) => {
        const value = event.target.value;
        formik.setFieldValue(
            "sizes",
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadError(null);

        try {
            setUploadingImage(true);
            const imageUrl = await uploadToCloudinary(file);
            formik.setFieldValue("images", [...formik.values.images, imageUrl]);
        } catch (error: any) {
            console.error("Image upload failed:", error);
            setUploadError(error?.message || "Image upload failed. Please try again.");
        } finally {
            setUploadingImage(false);
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

                                <label className="relative" htmlFor="fileInput">
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
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                sx={fieldSx}
                                id="description"
                                name="description"
                                label="Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
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
                                onBlur={formik.handleBlur}
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
                                onBlur={formik.handleBlur}
                                error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
                                helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
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
                                onBlur={formik.handleBlur}
                                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                helperText={formik.touched.quantity && formik.errors.quantity}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}><Divider sx={{ borderColor: palette.border }} /></Grid>

                        {/* ---- Variants ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel title="Variants" hint="You can select more than one size." />
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
                                    onBlur={formik.handleBlur}
                                    label="Color"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {colors.map((color, index) => (
                                        <MenuItem key={index} value={color.name}>
                                            <div className="flex gap-3 items-center">
                                                <span
                                                    style={{ background: color.hex }}
                                                    className={`h-5 w-5 rounded-full flex-shrink-0 ${color.name === "White" || color.name === "Off White" ? "border" : ""}`}
                                                />
                                                <p>{color.name}</p>
                                            </div>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.color && formik.errors.color && (
                                    <FormHelperText>{formik.errors.color}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {/* ---- MULTIPLE SIZES ---- */}
                        <Grid size={{ xs: 12, md: 8, lg: 6 }}>
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
                                    multiple
                                    value={formik.values.sizes}
                                    onChange={handleSizesChange}
                                    onBlur={() => formik.setFieldTouched("sizes", true)}
                                    label="Sizes"
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {(selected as string[]).map((value) => (
                                                <Chip key={value} label={value} size="small" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {sizes.map((size) => (
                                        <MenuItem key={size.name} value={size.name}>
                                            <Checkbox
                                                checked={formik.values.sizes.includes(size.name)}
                                                sx={{ color: palette.border, "&.Mui-checked": { color: palette.accent } }}
                                            />
                                            <ListItemText primary={size.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.sizes && formik.errors.sizes && (
                                    <FormHelperText>{formik.errors.sizes as string}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12 }}><Divider sx={{ borderColor: palette.border }} /></Grid>

                        {/* ---- Product attributes ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel
                                title="Product attributes"
                                hint="Optional. Fill in what applies to this product."
                            />
                        </Grid>
                        {attributeFields.map((field) => (
                            <Grid key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    sx={fieldSx}
                                    id={field.name}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    value={(formik.values as Record<string, any>)[field.name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Grid>
                        ))}

                        <Grid size={{ xs: 12 }}><Divider sx={{ borderColor: palette.border }} /></Grid>

                        {/* ---- Category ---- */}
                        <Grid size={{ xs: 12 }}>
                            <SectionLabel title="Category" hint="Choose up to three levels to help buyers find this product." />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                required
                            >
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={handleMainCategoryChange}
                                    onBlur={formik.handleBlur}
                                    label="Category"
                                >
                                    {mainCategory.map((item) => (
                                        <MenuItem key={item.categoryId} value={item.categoryId}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.category && formik.errors.category && (
                                    <FormHelperText>{formik.errors.category}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.category2 && Boolean(formik.errors.category2)}
                                disabled={!formik.values.category}
                                required
                            >
                                <InputLabel id="category2-label">Second category</InputLabel>
                                <Select
                                    labelId="category2-label"
                                    id="category2"
                                    name="category2"
                                    value={formik.values.category2}
                                    onChange={handleCategory2Change}
                                    onBlur={formik.handleBlur}
                                    label="Second category"
                                >
                                    {filteredLevelTwo.length === 0 ? (
                                        <MenuItem value="" disabled>
                                            <em>Select a category first</em>
                                        </MenuItem>
                                    ) : (
                                        filteredLevelTwo.map((item) => (
                                            <MenuItem key={item.categoryId} value={item.categoryId}>
                                                {item.name}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                                {formik.touched.category2 && formik.errors.category2 && (
                                    <FormHelperText>{formik.errors.category2}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl
                                fullWidth
                                sx={fieldSx}
                                error={formik.touched.category3 && Boolean(formik.errors.category3)}
                                disabled={!formik.values.category2}
                                required
                            >
                                <InputLabel id="category3-label">Third category</InputLabel>
                                <Select
                                    labelId="category3-label"
                                    id="category3"
                                    name="category3"
                                    value={formik.values.category3}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="Third category"
                                >
                                    {filteredLevelThree.length === 0 ? (
                                        <MenuItem value="" disabled>
                                            <em>Select a second category first</em>
                                        </MenuItem>
                                    ) : (
                                        filteredLevelThree.map((item) => (
                                            <MenuItem key={item.categoryId} value={item.categoryId}>
                                                {item.name}
                                            </MenuItem>
                                        ))
                                    )}
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
