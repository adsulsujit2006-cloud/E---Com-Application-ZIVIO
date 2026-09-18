import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

interface Order {
  orderId: string;
  product: string;
  address: string;
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, { bg: string; text: string }> = {
  Pending: { bg: '#FEF3D6', text: '#B7791F' },
  Shipped: { bg: '#DCEAF7', text: '#2563A6' },
  Delivered: { bg: '#DFF3E6', text: '#1F7A4D' },
  Cancelled: { bg: '#FBE1DE', text: '#C4433A' },
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1F2420',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.01em',
    borderBottom: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#1B1F1C',
    borderBottom: '1px solid #E3E6E1',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F9FAF8',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createOrder(
  orderId: string,
  product: string,
  address: string,
  status: OrderStatus,
): Order {
  return { orderId, product, address, status };
}

const initialOrders: Order[] = [
  createOrder('ORD-10231', 'Frozen Yoghurt Maker', '221B Baker Street, London', 'Pending'),
  createOrder('ORD-10232', 'Ice Cream Sandwich Set', '12 MG Road, Pune', 'Shipped'),
  createOrder('ORD-10233', 'Eclair Gift Box', '45 Rue de Rivoli, Paris', 'Delivered'),
  createOrder('ORD-10234', 'Cupcake Baking Kit', '9 Fifth Avenue, New York', 'Cancelled'),
  createOrder('ORD-10235', 'Gingerbread House Kit', '3 Orchard Road, Singapore', 'Pending'),
];

const StatusPill = ({ status }: { status: OrderStatus }) => {
  const { bg, text } = statusStyles[status];
  return (
    <Box
      sx={{
        display: 'inline-block',
        px: '10px',
        py: '3px',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        backgroundColor: bg,
        color: text,
      }}
    >
      {status}
    </Box>
  );
};

export default function DealTable() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (orderId: string, event: SelectChangeEvent) => {
    const newStatus = event.target.value as OrderStatus;
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: '1px solid #E3E6E1',
        borderRadius: '12px',
        boxShadow: 'none',
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="orders table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell>Update</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.orderId}>
              <StyledTableCell component="th" scope="row">
                {order.orderId}
              </StyledTableCell>
              <StyledTableCell>{order.product}</StyledTableCell>
              <StyledTableCell>{order.address}</StyledTableCell>
              <StyledTableCell>
                <StatusPill status={order.status} />
              </StyledTableCell>
              <StyledTableCell>
                <Button>
                  <Edit/>
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton>
                  <Delete sx={{color:"red"}}/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}