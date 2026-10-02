import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api"; // file name must match exactly (Api.ts)

// Pull a readable message out of whatever the backend sends back
const getErrorMessage = (error: any): string =>
  error?.response?.data?.message ||
  (typeof error?.response?.data === "string" ? error.response.data : null) ||
  error?.message ||
  "Something went wrong on the server";

/* ---------------------------- LOGIN ---------------------------- */
export const sellerLogin = createAsyncThunk<any, any, { rejectValue: string }>(
  "sellerAuth/login",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);
      console.log("login response", response.data);

      const jwt = response.data?.jwt;
      if (jwt) localStorage.setItem("jwt", jwt);

      return response.data;
    } catch (error: any) {
      console.log("login error----------", error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/* ------------------------- CREATE SELLER ------------------------- */
export const createSeller = createAsyncThunk<any, any, { rejectValue: string }>(
  "sellerAuth/createSeller",
  async (sellerData, { rejectWithValue }) => {
    try {
      const res = await api.post("/sellers", sellerData); // change if your endpoint differs
      console.log("create seller response", res.data);

      if (res.data?.jwt) localStorage.setItem("jwt", res.data.jwt);

      return res.data;
    } catch (error: any) {
      console.log("create seller error----------", error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/* ----------------------------- SLICE ----------------------------- */
interface SellerAuthState {
  seller: any | null;
  jwt: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SellerAuthState = {
  seller: null,
  jwt: localStorage.getItem("jwt"),
  loading: false,
  error: null,
};

const sellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    logoutSeller: (state) => {
      state.seller = null;
      state.jwt = null;
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(sellerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
        state.jwt = action.payload?.jwt ?? null;
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // create seller
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
        state.jwt = action.payload?.jwt ?? null;
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create account";
      });
  },
});

export const { logoutSeller } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;