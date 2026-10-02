import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../config/Api";
import { Product } from "../../type/ProductTypes";

const API_URL = "/products";

export const fetchProductById = createAsyncThunk(
  "products/fetchProdutById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      const data = response.data;
      console.log("data: ", data);
      return data;
    } catch (error: any) {
      console.log("error: " + error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProdut",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: { query },
      });
      const data = response.data;
      console.log("search product data: ", data);
      return data;
    } catch (error: any) {
      console.log("error: " + error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk<any, any>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      // remove empty values (sort: "", color: null) so Spring doesn't get blank params
      const cleanParams: any = {};
      Object.keys(params || {}).forEach((key) => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== "") {
          cleanParams[key] = value;
        }
      });

      const response = await api.get(`${API_URL}`, {
        params: {
          ...cleanParams,
          pageNumber: params?.pageNumber || 0,
        },
      });

      const data = response.data;
      console.log("All product data: ", response.data);
      return data;
    } catch (error: any) {
      console.log("error: " + error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

interface ProductState {
  product: Product | null;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null | undefined | any;
  searchProduct: Product[];
}

const intialState: ProductState = {
  product: null,
  products: [],
  totalPages: 0,
  loading: false,
  error: null,
  searchProduct: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProductById
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // fetchAllProducts
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      // FIX: Spring Page puts the list in "content", not "products"
      state.products = action.payload?.content ?? [];
      state.totalPages = action.payload?.totalPages ?? 0;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // searchProduct
    builder.addCase(searchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.loading = false;
      // FIX: works whether the search API returns a plain list or a Page
      state.searchProduct = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.content ?? [];
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;