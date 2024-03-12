import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createAddressAction = createAsyncThunk(
    "create/Address",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/address`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
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

export const getUserAddressAction = createAsyncThunk(
    "get/user/Address",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/address/${data._id}`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
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