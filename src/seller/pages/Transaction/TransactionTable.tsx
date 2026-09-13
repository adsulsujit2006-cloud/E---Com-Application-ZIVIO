import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import React from 'react';

interface Transaction {
  date: string;
  customer: string;
  address: string;
  orderId: string;
  amount: number;
  type: 'credit' | 'debit';
}

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

function createTransaction(
  date: string,
  customer: string,
  address: string,
  orderId: string,
  amount: number,
  type: 'credit' | 'debit',
): Transaction {
  return { date, customer, address, orderId, amount, type };
}

const rows: Transaction[] = [
  createTransaction('12 Sep 2026', 'Ananya Rao', '221B Baker Street, London', 'ORD-10231', 1499, 'credit'),
  createTransaction('10 Sep 2026', 'Rahul Mehta', '12 MG Road, Pune', 'ORD-10232', 899, 'credit'),
  createTransaction('08 Sep 2026', 'Sofia Martins', '45 Rue de Rivoli, Paris', 'ORD-10233', 250, 'debit'),
  createTransaction('05 Sep 2026', 'James Whitfield', '9 Fifth Avenue, New York', 'ORD-10234', 2100, 'credit'),
  createTransaction('01 Sep 2026', 'Li Wei', '3 Orchard Road, Singapore', 'ORD-10235', 175, 'debit'),
];

const AmountCell = ({ amount, type }: { amount: number; type: 'credit' | 'debit' }) => (
  <Box
    component="span"
    sx={{
      fontWeight: 600,
      color: type === 'credit' ? '#1F7A4D' : '#C4433A',
    }}
  >
    {type === 'credit' ? '+' : '−'}₹{amount.toLocaleString('en-IN')}
  </Box>
);

export default function TransactionTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: '1px solid #E3E6E1',
        borderRadius: '12px',
        boxShadow: 'none',
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="transactions table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer details</StyledTableCell>
            <StyledTableCell>Shipping address</StyledTableCell>
            <StyledTableCell>Order</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.orderId}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell>{row.customer}</StyledTableCell>
              <StyledTableCell>{row.address}</StyledTableCell>
              <StyledTableCell>{row.orderId}</StyledTableCell>
              <StyledTableCell align="right">
                <AmountCell amount={row.amount} type={row.type} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}