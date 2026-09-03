
import {
    TextField,
    Typography,
    Paper,
    InputAdornment
} from "@mui/material";
import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";

interface BecomeSellerFromStep2Props {
    formik: any;
}

const BecomeSellerFromStep3: React.FC<BecomeSellerFromStep2Props> = ({ formik }) => {

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="mb-6">
                <Typography
                    variant="h5"
                    fontWeight="700"
                    className="text-gray-800"
                >
                    Bank Details
                </Typography>

                <Typography
                    variant="body2"
                    className="text-gray-500 mt-1"
                >
                    Provide your bank details to receive payments from your sales.
                </Typography>
            </div>

            {/* Bank Details Card */}
            <Paper
                elevation={0}
                className="p-6 rounded-2xl border border-gray-200 bg-white"
            >

                <div className="space-y-5">

                    {/* Account Number */}
                    <TextField
                        fullWidth
                        name="bankDetails.accountNumber"
                        label="Account Number"
                        placeholder="Enter your bank account number"
                        value={formik.values.bankDetails.accountNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.bankDetails?.accountNumber &&
                            Boolean(formik.errors.bankDetails?.accountNumber)
                        }
                        helperText={
                            formik.touched.bankDetails?.accountNumber &&
                            formik.errors.bankDetails?.accountNumber
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CreditCardIcon className="text-gray-500" />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#fafafa"
                            }
                        }}
                    />

                    {/* IFSC Code */}
                    <TextField
                        fullWidth
                        name="bankDetails.ifscCode"
                        label="IFSC Code"
                        placeholder="Enter IFSC code"
                        value={formik.values.bankDetails.ifscCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.bankDetails?.ifscCode &&
                            Boolean(formik.errors.bankDetails?.ifscCode)
                        }
                        helperText={
                            formik.touched.bankDetails?.ifscCode &&
                            formik.errors.bankDetails?.ifscCode
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBalanceIcon className="text-gray-500" />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#fafafa"
                            }
                        }}
                    />

                    {/* Account Holder Name */}
                    <TextField
                        fullWidth
                        name="bankDetails.accountHolderName"
                        label="Account Holder Name"
                        placeholder="Enter name as per bank account"
                        value={formik.values.bankDetails.accountHolderName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.bankDetails?.accountHolderName &&
                            Boolean(formik.errors.bankDetails?.accountHolderName)
                        }
                        helperText={
                            formik.touched.bankDetails?.accountHolderName &&
                            formik.errors.bankDetails?.accountHolderName
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon className="text-gray-500" />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#fafafa"
                            }
                        }}
                    />

                </div>

            </Paper>

            {/* Security Information */}
            <div className="flex items-center gap-3 px-2 py-2">
                <AccountBalanceIcon
                    fontSize="small"
                    className="text-gray-400"
                />

                <Typography
                    variant="caption"
                    className="text-gray-500"
                >
                    Make sure your bank account details are correct. Payments
                    will be transferred to this account.
                </Typography>
            </div>

        </div>
    );
};

export default BecomeSellerFromStep3;
