import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface CoupanFromValues {
    code: string;
    discountPercentage: number;
    validatiyStartDate: Dayjs | null;
    validatiyEndDate: Dayjs | null;
    minimumOrderValue: number;
}

const validationSchema = Yup.object({
    code: Yup.string()
        .trim()
        .min(4, "Code must be at least 4 characters")
        .max(16, "Code must be 16 characters or fewer")
        .matches(/^[A-Z0-9]+$/, "Use uppercase letters and numbers only")
        .required("Code is required"),
    discountPercentage: Yup.number()
        .min(1, "Must be at least 1%")
        .max(90, "Must be 90% or less")
        .required("Discount is required"),
    validatiyStartDate: Yup.mixed<Dayjs>().nullable().required("Start date is required"),
    validatiyEndDate: Yup.mixed<Dayjs>()
        .nullable()
        .required("End date is required")
        .test(
            "is-after-start",
            "End date must be after the start date",
            function (value) {
                const { validatiyStartDate } = this.parent;
                if (!value || !validatiyStartDate) return true;
                return dayjs(value).isAfter(dayjs(validatiyStartDate));
            }
        ),
    minimumOrderValue: Yup.number().min(0, "Cannot be negative"),
});

const AddNewCoupan = () => {
    const formik = useFormik<CoupanFromValues>({
        initialValues: {
            code: "",
            discountPercentage: 0,
            validatiyStartDate: null,
            validatiyEndDate: null,
            minimumOrderValue: 0,
        },
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            const formatedValues = {
                ...values,
                validatiyStartDate: values.validatiyStartDate?.toISOString() ?? null,
                validatiyEndDate: values.validatiyEndDate?.toISOString() ?? null,
            };

            console.log("From submited ", values, formatedValues);

            // Replace with your actual API call, e.g.:
            // await api.post("/coupons", formatedValues);

            setSubmitting(false);
            resetForm();
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper
                elevation={1}
                sx={{ maxWidth: 560, mx: "auto", mt: 4, p: 4, borderRadius: 2 }}
            >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Add new coupon
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Set the code, discount, validity window, and minimum order value.
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="code"
                                name="code"
                                label="Coupon code"
                                placeholder="SAVE20"
                                value={formik.values.code}
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        "code",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                onBlur={formik.handleBlur}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
                                inputProps={{ style: { textTransform: "uppercase" } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                id="discountPercentage"
                                name="discountPercentage"
                                label="Discount"
                                type="number"
                                InputProps={{ endAdornment: "%" }}
                                value={formik.values.discountPercentage}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.discountPercentage &&
                                    Boolean(formik.errors.discountPercentage)
                                }
                                helperText={
                                    formik.touched.discountPercentage &&
                                    formik.errors.discountPercentage
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                id="minimumOrderValue"
                                name="minimumOrderValue"
                                label="Minimum order value"
                                type="number"
                                InputProps={{ startAdornment: "$" }}
                                value={formik.values.minimumOrderValue}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.minimumOrderValue &&
                                    Boolean(formik.errors.minimumOrderValue)
                                }
                                helperText={
                                    formik.touched.minimumOrderValue &&
                                    formik.errors.minimumOrderValue
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                label="Valid from"
                                value={formik.values.validatiyStartDate}
                                onChange={(value) =>
                                    formik.setFieldValue("validatiyStartDate", value)
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        onBlur: () =>
                                            formik.setFieldTouched(
                                                "validatiyStartDate",
                                                true
                                            ),
                                        error:
                                            formik.touched.validatiyStartDate &&
                                            Boolean(formik.errors.validatiyStartDate),
                                        helperText:
                                            formik.touched.validatiyStartDate &&
                                            (formik.errors.validatiyStartDate as string),
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                label="Valid until"
                                value={formik.values.validatiyEndDate}
                                minDate={formik.values.validatiyStartDate ?? undefined}
                                onChange={(value) =>
                                    formik.setFieldValue("validatiyEndDate", value)
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        onBlur: () =>
                                            formik.setFieldTouched(
                                                "validatiyEndDate",
                                                true
                                            ),
                                        error:
                                            formik.touched.validatiyEndDate &&
                                            Boolean(formik.errors.validatiyEndDate),
                                        helperText:
                                            formik.touched.validatiyEndDate &&
                                            (formik.errors.validatiyEndDate as string),
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={12} sx={{ mt: 1 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                                fullWidth
                            >
                                {formik.isSubmitting ? "Creating…" : "Create coupon"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </LocalizationProvider>
    );
};

export default AddNewCoupan;
