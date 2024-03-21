import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const createOrderAction = createAsyncThunk(
    "create/order",
    async (item, { rejectWithValue }) => {
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

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const findAllUserOrderAction = createAsyncThunk(
    "getAll/userOrder",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/order`,
                // item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const DeleteOrderAction = createAsyncThunk(
    "delete/cancelUserOrder",
    async (id, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/order/delete/${id}`,
                // item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const CancelOrderAction = createAsyncThunk(
    "cancel/Order",
    async (id, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/order/cancel/${id}`,
                // id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const checkAvailableQuantityAction = createAsyncThunk(
    "check/quantity",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/order/check/product_quantity`,
                item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        }
        catch (error) {
            if (error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);