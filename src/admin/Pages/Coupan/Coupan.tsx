import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    styled,
    Chip,
    IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

const couponStatuses = [
    { status: 'ACTIVE', title: 'Active' },
    { status: 'EXPIRED', title: 'Expired' },
    { status: 'DISABLED', title: 'Disabled' },
];

// Styled table cell/row
const StyledTableCell = styled(TableCell)(() => ({
    fontSize: '0.85rem',
    color: '#333',
    borderBottom: '1px solid #E3E6E1',
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Status pill component, driven by couponStatuses so labels/colors stay in sync
const StatusPill = ({ status }: { status: string }) => {
    const colorMap: Record<string, "warning" | "info" | "success" | "error" | "default"> = {
        ACTIVE: "success",
        EXPIRED: "error",
        DISABLED: "default",
    };
    const title = couponStatuses.find((s) => s.status === status)?.title || status;
    return (
        <Chip
            label={title}
            color={colorMap[status] || "default"}
            size="small"
            sx={{ fontWeight: 500 }}
        />
    );
};

// Coupon type + sample data, matching the header columns
interface Coupon {
    couponCode: string;
    startDate: string;
    endDate: string;
    minOrderValue: string;
    discount: string;
    status: string;
}

const initialCoupons: Coupon[] = [
    { couponCode: "SAVE10", startDate: "2026-01-01", endDate: "2026-03-31", minOrderValue: "₹500", discount: "10%", status: "ACTIVE" },
    { couponCode: "FLAT100", startDate: "2025-12-01", endDate: "2025-12-31", minOrderValue: "₹1000", discount: "₹100", status: "EXPIRED" },
    { couponCode: "WELCOME20", startDate: "2026-02-01", endDate: "2026-06-30", minOrderValue: "₹750", discount: "20%", status: "DISABLED" },
];

const Coupon = () => {
    const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

    const handleStatusChange = (couponCode: string, event: any) => {
        setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
                coupon.couponCode === couponCode ? { ...coupon, status: event.target.value } : coupon
            )
        );
    }

    const handleDelete = (couponCode: string) => {
        setCoupons((prevCoupons) =>
            prevCoupons.filter((coupon) => coupon.couponCode !== couponCode)
        );
    }

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    border: '1px solid #E3E6E1',
                    borderRadius: '12px',
                    boxShadow: 'none',
                }}
            >
                <Table sx={{ minWidth: 700 }} aria-label="coupons table">
                    <TableHead>
                        <TableRow className="bg-gray-500">
                            <StyledTableCell>Coupon Code</StyledTableCell>
                            <StyledTableCell>Start Date</StyledTableCell>
                            <StyledTableCell>End Date</StyledTableCell>
                            <StyledTableCell>Minimum Order Value</StyledTableCell>
                            <StyledTableCell>Discount</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coupons.map((coupon) => (
                            <StyledTableRow key={coupon.couponCode}>
                                <StyledTableCell component="th" scope="row">
                                    {coupon.couponCode}
                                </StyledTableCell>
                                <StyledTableCell>{coupon.startDate}</StyledTableCell>
                                <StyledTableCell>{coupon.endDate}</StyledTableCell>
                                <StyledTableCell>{coupon.minOrderValue}</StyledTableCell>
                                <StyledTableCell>{coupon.discount}</StyledTableCell>
                                <StyledTableCell>
                                    <Select
                                        size="small"
                                        value={coupon.status}
                                        onChange={(event) => handleStatusChange(coupon.couponCode, event)}
                                        sx={{
                                            fontSize: '0.82rem',
                                            borderRadius: '6px',
                                            minWidth: '140px',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E3E6E1' },
                                        }}
                                    >
                                        {couponStatuses.map((item) => (
                                            <MenuItem key={item.status} value={item.status}>{item.title}</MenuItem>
                                        ))}
                                    </Select>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <IconButton
                                        aria-label="delete coupon"
                                        size="small"
                                        onClick={() => handleDelete(coupon.couponCode)}
                                        sx={{ color: '#d32f2f' }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default Coupon