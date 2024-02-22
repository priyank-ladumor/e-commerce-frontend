import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const getProducts = createAsyncThunk(
  "get/products",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/${data}`,
        // data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": localStorage.getItem('token')
          },
        }
      );
      return result.data.content;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProductsByIDAction = createAsyncThunk(
  "get/productsDetails",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/id/${data.id}`,
        // data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": token
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