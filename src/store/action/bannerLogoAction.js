
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getBannerAction = createAsyncThunk(
    "get/banner",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/banner`,
                // item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem('token')
                    },
                },
            );
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.response.data.error)
        }
    }
);

export const getLogoAction = createAsyncThunk(
    "get/logo",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/logo`,
                // item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem('token')
                    },
                },
            );
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.response.data.error)
        }
    }
);