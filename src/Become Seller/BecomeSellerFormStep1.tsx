import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1 = ({formik} :any) =>{
return(
    <Box>
<p className="text-xl font-bold text-center pb-9">Contact Details</p>

<div className="space-y-9">
    <TextField 
     fullWidth
     name = "Mobaile"
     label = "Mobie"
     value={formik.values.Mobaile}
     onChange={formik.handleChange}
     error={formik.touched.mobaile && Boolean(formik.errors.mobaile)}
     helperText={formik.touched.mobaile && formik.errors.mobaile}
    />
    <TextField 
     fullWidth
     name = "GSTIN"
     label = "GSTIN"
     value={formik.values.GSTIN}
     onChange={formik.handleChange}
     error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
     helperText={formik.touched.GSTIN && formik.errors.GSTIN}
    />

</div>
    </Box>
)
}

export default BecomeSellerFormStep1;