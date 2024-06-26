import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const gettoplevelCategoryAction = createAsyncThunk(
  "get/categories/toplevel",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/categories/toplevel`,
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


export const getsecondlevelCategoryAction = createAsyncThunk(
  "get/categories/secondlevel",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/categories/secondlevel/${data}`,
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

export const getthirdlevelCategoryAction = createAsyncThunk(
  "get/categories/thirdlevel",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/categories/thirdlevel/`,
        data,
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

export const getthirdlevelCategoryFilterAction = createAsyncThunk(
  "get/filtered/categories/thirdlevel",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/categories/thirdlevel/filterd`,
        data,
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

// export const getNavbarByTopAction = createAsyncThunk(
//   'get/navbar',
//   async (requestData) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/navbar`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const getNavbarByTopAction = createAsyncThunk(
  'get/navbar',
  async (requestData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/categories/navbar`, {top : requestData.top});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);