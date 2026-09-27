import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const sellerLogin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);

      console.log("login response", response.data);

      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);

      return response.data;
    } catch (error: any) {
      console.log("error----------", error);

      return rejectWithValue(
        error.response?.data || "Something went wrong on the server"
      );
    }
  }
);