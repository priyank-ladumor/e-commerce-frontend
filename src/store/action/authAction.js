import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export const userCreate = createAsyncThunk(
    "user/create",
    async (data, { rejectWithValue }) => {
        // const token = JSON.parse(localStorage.getItem('usertoken'))
        try {
            const result = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/signup`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": token
                    },
                }
            );
            localStorage.setItem("name", result.data.name)
            if (result.data.msg) {
                toast.success(result.data.msg, {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


export const userLogin = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        // const token = JSON.parse(localStorage.getItem('usertoken'))
        try {
            const result = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/signin`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": token
                    },
                }
            );
            localStorage.setItem("token", result.data.token)
            localStorage.removeItem("name")
            if (result.data.msg) {
                toast.success(result.data.msg, {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


export const userAccountVerified = createAsyncThunk(
    "user/AccountVerify",
    async (token, { rejectWithValue }) => {
        const navigate = useNavigate()
        // const token = JSON.parse(localStorage.getItem('usertoken'))
        try {
            const result = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/${token}`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": token
                    },
                }
            );
            if (result.data.msg) {
                navigate("/login")
            }
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);