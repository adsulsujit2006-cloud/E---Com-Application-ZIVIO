import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/Api";

export const sendLoginSignupOtp = createAsyncThunk(
  "/auth/fetchSellerProfile",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", { email });

      console.log("login otp response", response.data);

      // ✅ Return the data so reducers can use it
      return response.data;
    } catch (error: any) {
      console.log("error----------", error);

      // ✅ Pass error back to rejected action
      return rejectWithValue(
        error.response?.data || "Something went wrong on the server"
      );
    }
  }
);
