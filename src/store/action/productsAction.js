import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const getProducts = createAsyncThunk(
  "get/products",
  async (data, { rejectWithValue }) => {
    // const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.get(
        // `${process.env.REACT_APP_BASE_URL}/product`,
        `https://dummyjson.com/products`,
        // data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": token
          },
        }
      );
      return result.data.products;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);