import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, { useState } from 'react';

interface Product {
  id: string;
  image: string;
  title: string;
  mrp: number;
  sellingPrice: number;
  colorName: string;
  colorHex: string;
  stock: number;
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

function createProduct(
  id: string,
  image: string,
  title: string,
  mrp: number,
  sellingPrice: number,
  colorName: string,
  colorHex: string,
  stock: number,
): Product {
  return { id, image, title, mrp, sellingPrice, colorName, colorHex, stock };
}

const initialProducts: Product[] = [
  createProduct('P-1001', 'https://via.placeholder.com/56?text=Yog', 'Frozen Yoghurt Maker', 1999, 1599, 'White', '#FFFFFF', 24),
  createProduct('P-1002', 'https://via.placeholder.com/56?text=Ice', 'Ice Cream Sandwich Set', 1299, 999, 'Pink', '#FFC0CB', 12),
  createProduct('P-1003', 'https://via.placeholder.com/56?text=Ecl', 'Eclair Gift Box', 899, 749, 'Brown', '#A52A2A', 8),
  createProduct('P-1004', 'https://via.placeholder.com/56?text=Cup', 'Cupcake Baking Kit', 1499, 1199, 'Gold', '#FFD700', 30),
  createProduct('P-1005', 'https://via.placeholder.com/56?text=Gin', 'Gingerbread House Kit', 2499, 1999, 'Red', '#FF0000', 5),
];

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleStockChange = (id: string, value: string) => {
    const nextStock = Math.max(0, Number(value) || 0);
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, stock: nextStock } : product
      )
    );
  };

  const handleEdit = (id: string) => {
    console.log('Edit product:', id);
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
      <Table sx={{ minWidth: 760 }} aria-label="products table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling price</StyledTableCell>
            <StyledTableCell>Color</StyledTableCell>
            <StyledTableCell align="center">Stock</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell component="th" scope="row">
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/56?text=No+Image';
                  }}
                  sx={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #E3E6E1',
                    display: 'block',
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>{product.title}</StyledTableCell>
              <StyledTableCell align="right">
                <Box component="span" sx={{ color: '#5B645D', textDecoration: 'line-through' }}>
                  ₹{product.mrp.toLocaleString('en-IN')}
                </Box>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Box component="span" sx={{ fontWeight: 600 }}>
                  ₹{product.sellingPrice.toLocaleString('en-IN')}
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Box
                    sx={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: product.colorHex,
                      border: product.colorName === 'White' ? '1px solid #E3E6E1' : 'none',
                    }}
                  />
                  {product.colorName}
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  size="small"
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleStockChange(product.id, e.target.value)}
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root': { borderRadius: '6px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E3E6E1' },
                    '& input': { textAlign: 'center', fontSize: '0.85rem', py: '6px' },
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  size="small"
                  onClick={() => handleEdit(product.id)}
                  sx={{ color: '#1F4B43' }}
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}