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
    Chip
} from "@mui/material";
import React, { useState } from "react";

const accountStatuses = [
    { status: 'PENDING_VERIFICATION', title: 'Pending Verification', description: 'Account has been created but email or identity verification has not yet been completed.' },
    { status: 'ACTIVE', title: 'Active', description: 'Account is active and in good standing, with full access to all features.' },
    { status: 'SUSPENDED', title: 'Suspended', description: 'Account is temporarily suspended due to a policy violation or suspicious activity, and access is restricted until reviewed.' },
    { status: 'DEACTIVATED', title: 'Deactivated', description: 'Account is deactivated, either by the user or an admin, and can typically be reactivated later.' },
    { status: 'BANNED', title: 'Banned', description: 'Account is permanently banned due to a severe or repeated violation of terms of service.' },
    { status: 'CLOSED', title: 'Closed', description: 'Account is permanently closed, either by user request or after prolonged inactivity, and cannot be reopened.' },
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

// Status pill component, driven by accountStatuses so labels/colors stay in sync
const StatusPill = ({ status }: { status: string }) => {
    const colorMap: Record<string, "warning" | "info" | "success" | "error" | "default"> = {
        PENDING_VERIFICATION: "warning",
        ACTIVE: "success",
        SUSPENDED: "warning",
        DEACTIVATED: "default",
        BANNED: "error",
        CLOSED: "error",
    };
    const title = accountStatuses.find((s) => s.status === status)?.title || status;
    return (
        <Chip
            label={title}
            color={colorMap[status] || "default"}
            size="small"
            sx={{ fontWeight: 500 }}
        />
    );
};

// Seller type + sample data, matching the new header columns
interface Seller {
    sellerId: string;
    sellerName: string;
    email: string;
    mobileNo: string;
    gstin: string;
    businessName: string;
    status: string;
}

const initialSellers: Seller[] = [
    { sellerId: "SEL-001", sellerName: "Rahul Sharma", email: "rahul@example.com", mobileNo: "9876543210", gstin: "27ABCDE1234F1Z5", businessName: "Sharma Electronics", status: "ACTIVE" },
    { sellerId: "SEL-002", sellerName: "Priya Verma", email: "priya@example.com", mobileNo: "9123456780", gstin: "07XYZAB5678G1Z2", businessName: "Verma Textiles", status: "PENDING_VERIFICATION" },
    { sellerId: "SEL-003", sellerName: "Amit Singh", email: "amit@example.com", mobileNo: "9988776655", gstin: "29LMNOP4321H1Z9", businessName: "Singh Traders", status: "SUSPENDED" },
];

const SellerTable = () => {
    const [accountStatus, setAccountStatus] = useState("ACTIVE");
    const [sellers, setSellers] = useState<Seller[]>(initialSellers);

    const handleChange = (event: any) => {
        setAccountStatus(event.target.value);
    }

    const handleStatusChange = (sellerId: string, event: any) => {
        setSellers((prevSellers) =>
            prevSellers.map((seller) =>
                seller.sellerId === sellerId ? { ...seller, status: event.target.value } : seller
            )
        );
    }

    return (
        <>
            <div className="pb-5 w-60">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={accountStatus}
                        label="Account Status"
                        onChange={handleChange}
                    >
                        {accountStatuses.map((item) => (
                            <MenuItem key={item.status} value={item.status}>{item.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <TableContainer
                component={Paper}
                sx={{
                    border: '1px solid #E3E6E1',
                    borderRadius: '12px',
                    boxShadow: 'none',
                }}
            >
                <Table sx={{ minWidth: 700 }} aria-label="sellers table">
                    <TableHead>
                        <TableRow className="bg-gray-500">
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Seller Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Mobile No</StyledTableCell>
                            <StyledTableCell>GSTIN</StyledTableCell>
                            <StyledTableCell>Business Name</StyledTableCell>
                            <StyledTableCell>Account Status</StyledTableCell>
                            <StyledTableCell>Change Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellers.map((seller) => (
                            <StyledTableRow key={seller.sellerId}>
                                <StyledTableCell component="th" scope="row">
                                    {seller.sellerId}
                                </StyledTableCell>
                                <StyledTableCell>{seller.sellerName}</StyledTableCell>
                                <StyledTableCell>{seller.email}</StyledTableCell>
                                <StyledTableCell>{seller.mobileNo}</StyledTableCell>
                                <StyledTableCell>{seller.gstin}</StyledTableCell>
                                <StyledTableCell>{seller.businessName}</StyledTableCell>
                                <StyledTableCell>
                                    <StatusPill status={seller.status} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Select
                                        size="small"
                                        value={seller.status}
                                        onChange={(event) => handleStatusChange(seller.sellerId, event)}
                                        sx={{
                                            fontSize: '0.82rem',
                                            borderRadius: '6px',
                                            minWidth: '160px',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E3E6E1' },
                                        }}
                                    >
                                        {accountStatuses.map((item) => (
                                            <MenuItem key={item.status} value={item.status}>{item.title}</MenuItem>
                                        ))}
                                    </Select>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default SellerTable