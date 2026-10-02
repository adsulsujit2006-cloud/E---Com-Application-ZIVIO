import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/Api";

export const sendLoginSignupOtp = createAsyncThunk(
  "/auth/sendLoginSignupOtp",
  async (
    { email }: { email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/auth/send/signup-otp",
        { email }
      );

      console.log("Login OTP response:", response.data);

      return response.data;
    } catch (error: any) {
      console.log("Error----------", error);

      return rejectWithValue(
        error.response?.data || "Something went wrong on the server"
      );
    }
  }
);


export const logout = createAsyncThunk<any,any>("/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear()
      console.log("logout success")
      navigate("/")
    } catch (error) {
      console.log("error - - -", error);
    }
  }
)