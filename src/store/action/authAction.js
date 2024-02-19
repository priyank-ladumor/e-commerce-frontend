import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'

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
                Swal.fire({
                    title: "Registered Successfully!",
                    text: result.data.msg,
                    icon: "success",
                    confirmButtonColor: "green",
                    confirmButtonText: "Go to Gmail"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "https://mail.google.com/mail"

                    }
                })
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
            // localStorage.setItem("role", result.data.role)
            localStorage.removeItem("name")
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
        // const navigate = useNavigate()
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
            // if (result.data.msg) {
            //     navigate("/login")
            // }
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

// export const findUserRole = createAsyncThunk(
//     "user/role",
//     async (auth, { rejectWithValue }) => {
//         try {
//             const result = await axios.get(
//                 `${process.env.REACT_APP_BASE_URL}/user/role`,
//                 // data,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": auth
//                     },
//                 }
//             );
//             return result.data;
//         } catch (error) {
//             if (error.response && error.response.data.msg) {
//                 return rejectWithValue(error.response.data.msg);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// );