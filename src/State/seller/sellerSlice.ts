import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProfile = createAsyncThunk("/sellers/fetchSellerProfile",
    async (jwt: string, { rejectWithValue }) => {
        try {
            const response = await api.get("/seller/profile", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            console.log("fetch seller profile", response)
        } catch (error) {
            console.log("error----------", error)
        }
    }
)