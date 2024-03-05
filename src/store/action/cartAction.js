import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const addToCartAction = createAsyncThunk(
  "addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cart/add`,
        data,
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

export const getCartItemsAction = createAsyncThunk(
  "get/cartItems",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cart`,
        // data,
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

export const cartitemRemoveAction = createAsyncThunk(
  "delete/cartItems",
  async (item, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    console.log(`${item.color.split("#")[1]}`)
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cartitem/${item.size}/${item.color.split('#')[1]}/${item.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
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

export const updateCartItemsAction = createAsyncThunk(
  "update/cartItems",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cartitem/${data.id}`,
        data,
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