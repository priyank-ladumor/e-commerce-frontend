import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const createOrderAction = createAsyncThunk(
    "create/order",
    async (item, { rejectWithValue }) => {
        console.log(localStorage.getItem('token'));
        try {
            const result = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/order`,
                item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);