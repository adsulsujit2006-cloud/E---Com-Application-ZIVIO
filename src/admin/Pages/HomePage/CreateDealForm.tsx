import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const CreateDealForm = () => {
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: (values) => {
      console.log("submit", values);
    },
  });

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4ecf7 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 460,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
        }}
      >
        <Box
          component={"form"}
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 700, color: "#1a237e", mb: 1 }}
          >
            Create Deal
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: -2, mb: 1 }}
          >
            Fill in the details below to add a new deal
          </Typography>

          <TextField
            fullWidth
            type="number"
            name="discount"
            label="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={formik.values.category}
              label="Category"
              onChange={formik.handleChange}
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem value={"Ten"}>Ten</MenuItem>
              <MenuItem value={"Twenty"}>Twenty</MenuItem>
              <MenuItem value={"Thirty"}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "0 4px 14px rgba(25, 118, 210, 0.35)",
              "&:hover": {
                boxShadow: "0 6px 18px rgba(25, 118, 210, 0.45)",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateDealForm;