import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Chip, CircularProgress, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerProducts } from '../../../State/seller/sellerProductSlice';

interface Product {
  id: string;
  images: string[];
  title: string;
  description: string;
  category: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  colorName: string;
  colorHex: string;
  sizes: string[];
  stock: number;
  numRating: number;
}

// Local placeholder generator (SVG data URI) - avoids depending on an
// external image service like via.placeholder.com, which can time out
// or go down and break the whole table's image loading.
const placeholderImage = (text: string, bg = '#E3E6E1', fg = '#5B645D'): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56">
      <rect width="100%" height="100%" fill="${bg}" rx="8" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14"
        text-anchor="middle" dominant-baseline="middle" fill="${fg}">
        ${text}
      </text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const NO_IMAGE_PLACEHOLDER = placeholderImage('No Image');

// Maximum number of thumbnails shown per row before collapsing into a "+N" badge.
const MAX_VISIBLE_IMAGES = 3;

// The backend only sends a color *name* (e.g. "Blue"), not a hex value,
// so map common color names to a swatch color for the UI dot.
const COLOR_HEX_MAP: Record<string, string> = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  blue: '#1E5FBF',
  navy: '#1B2A4A',
  green: '#2E7D32',
  pink: '#FFC0CB',
  gold: '#FFD700',
  yellow: '#FFD54F',
  brown: '#A52A2A',
  purple: '#7B1FA2',
  orange: '#FB8C00',
  grey: '#9E9E9E',
  gray: '#9E9E9E',
  beige: '#E8DCC8',
  maroon: '#800000',
  multicolor: 'linear-gradient(90deg,#f44336,#ffeb3b,#4caf50,#2196f3)',
};

const getColorHex = (colorName: string): string =>
  COLOR_HEX_MAP[colorName?.toLowerCase()?.trim()] ?? '#CCCCCC';

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

// Maps a raw product object from the API (see sellerProductSlice ->
// fetchSellerProducts) into the shape this table renders.
const normalizeProduct = (p: any): Product => {
  const rawImages: string[] = Array.isArray(p.images)
    ? p.images.filter((img: unknown): img is string => typeof img === 'string' && img.trim().length > 0)
    : [];
  const images = rawImages.length > 0 ? rawImages : [NO_IMAGE_PLACEHOLDER];

  const colorName: string = p.color ?? '-';
  const sizes: string[] =
    typeof p.sizes === 'string'
      ? p.sizes.split(',').map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(p.sizes)
      ? p.sizes
      : [];

  return {
    id: String(p.id),
    images,
    title: p.title ?? 'Untitled product',
    description: p.description ?? '',
    category: p.category?.categoryId ?? p.category?.name ?? '-',
    mrp: Number(p.mrpPrice ?? 0),
    sellingPrice: Number(p.sellingPrice ?? p.mrpPrice ?? 0),
    discountPercent: Number(p.discountPercent ?? 0),
    colorName,
    colorHex: getColorHex(colorName),
    sizes,
    stock: Number(p.quantity ?? 0),
    numRating: Number(p.numRating ?? 0),
  };
};

// Renders every image in a product's images array as a small thumbnail
// strip (overlapping stack), instead of only showing images[0]. Extra
// images beyond MAX_VISIBLE_IMAGES collapse into a "+N" badge.
const ProductImageStack: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const visible = images.slice(0, MAX_VISIBLE_IMAGES);
  const hiddenCount = images.length - visible.length;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {visible.map((src, index) => (
        <Tooltip key={`${src}-${index}`} title={`${title} - image ${index + 1} of ${images.length}`}>
          <Box
            component="img"
            src={src}
            alt={`${title} ${index + 1}`}
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = NO_IMAGE_PLACEHOLDER;
            }}
            sx={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid #FFFFFF',
              boxShadow: '0 0 0 1px #E3E6E1',
              display: 'block',
              ml: index === 0 ? 0 : '-12px',
              position: 'relative',
              zIndex: visible.length - index,
              bgcolor: '#F1F2F0',
            }}
          />
        </Tooltip>
      ))}

      {hiddenCount > 0 && (
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: '2px solid #FFFFFF',
            boxShadow: '0 0 0 1px #E3E6E1',
            bgcolor: '#1F2420',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: '-12px',
            zIndex: 0,
          }}
        >
          +{hiddenCount}
        </Box>
      )}
    </Box>
  );
};

export default function ProductTable() {
  const dispatch = useAppDispatch();

  const { products: sellerProducts, loading, error } = useAppSelector(
    (store: any) => store.sellerProduct
  );

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem('jwt')));
  }, [dispatch]);

  // Whenever the backend data in the store changes, normalize it into the
  // shape this table expects and refresh the local editable copy.
  useEffect(() => {
    if (Array.isArray(sellerProducts)) {
      setProducts(sellerProducts.map(normalizeProduct));
    }
  }, [sellerProducts]);

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
      <Table sx={{ minWidth: 980 }} aria-label="products table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling price</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
            <StyledTableCell>Color</StyledTableCell>
            <StyledTableCell>Sizes</StyledTableCell>
            <StyledTableCell align="center">Update Stock</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <StyledTableCell colSpan={10} align="center" sx={{ py: 4 }}>
                <CircularProgress size={28} />
              </StyledTableCell>
            </TableRow>
          )}

          {!loading && error && (
            <TableRow>
              <StyledTableCell colSpan={10} align="center" sx={{ py: 4 }}>
                <Typography color="error" variant="body2">
                  Failed to load products: {error}
                </Typography>
              </StyledTableCell>
            </TableRow>
          )}

          {!loading && !error && products.length === 0 && (
            <TableRow>
              <StyledTableCell colSpan={10} align="center" sx={{ py: 4 }}>
                <Typography color="text.secondary" variant="body2">
                  No products found.
                </Typography>
              </StyledTableCell>
            </TableRow>
          )}

          {!loading &&
            !error &&
            products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">
                  <ProductImageStack images={product.images} title={product.title} />
                </StyledTableCell>

                <StyledTableCell sx={{ maxWidth: 220 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.description}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      textTransform: 'capitalize',
                      bgcolor: '#EEF2EF',
                      color: '#1F4B43',
                      fontWeight: 600,
                    }}
                  />
                </StyledTableCell>

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

                <StyledTableCell align="center">
                  {product.discountPercent > 0 ? (
                    <Chip
                      label={`${product.discountPercent}% off`}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      —
                    </Typography>
                  )}
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
                        border:
                          product.colorName.toLowerCase() === 'white'
                            ? '1px solid #E3E6E1'
                            : 'none',
                      }}
                    />
                    {product.colorName}
                  </Box>
                </StyledTableCell>

                <StyledTableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: 140 }}>
                    {product.sizes.length > 0 ? (
                      product.sizes.map((size) => (
                        <Chip
                          key={size}
                          label={size}
                          size="small"
                          sx={{ height: '20px', fontSize: '11px' }}
                        />
                      ))
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        —
                      </Typography>
                    )}
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
