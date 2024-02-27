import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getSizesAction = createAsyncThunk(
    "get/sizes",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/size`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);