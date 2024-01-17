import { createSlice } from "@reduxjs/toolkit";
import { userCreate, userLogin, userAccountVerified } from "../action/authAction";


const initialState = {
    userCreateSuccess: false,
    userCreateError: null,
    userCreatePending: false,
    userLoginSuccess: false,
    userLoginError: null,
    userLoginPending: false,
    userAccountVerifiedSuccess: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Logout: (state) => {
            // state.isuserToken = null;
            // state.issuccess = false;
            // state.success = false;
            // state.isrefresh = true;
            // localStorage.clear();
        },
    },
    extraReducers: (builder) => {

        builder.addCase(userCreate.pending, (state, { payload }) => {
            state.userCreateSuccess = false;
            state.userCreateError = null;
            state.userCreatePending = true;
        })

        builder.addCase(userCreate.fulfilled, (state, { payload }) => {
            state.userCreateSuccess = payload;
            state.userCreateError = null;
            state.userCreatePending = false;
        })

        builder.addCase(userCreate.rejected, (state, { payload }) => {
            state.userCreateSuccess = false;
            state.userCreateError = payload;
            state.userCreatePending = false;
        })

        builder.addCase(userLogin.pending, (state, { payload }) => {
            state.userLoginSuccess = false;
            state.userLoginError = null;
            state.userLoginPending = true;
        })

        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.userLoginSuccess = payload;
            state.userLoginError = null;
            state.userLoginPending = false;
        })

        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.userLoginSuccess = false;
            state.userLoginError = payload;
            state.userLoginPending = false;
        })

        builder.addCase(userAccountVerified.pending, (state, { payload }) => {
            state.userAccountVerifiedSuccess = null;
        })

        builder.addCase(userAccountVerified.fulfilled, (state, { payload }) => {
            state.userAccountVerifiedSuccess = payload;
        })

        builder.addCase(userAccountVerified.rejected, (state, { payload }) => {
            state.userAccountVerifiedSuccess = null;
        })
    }
});

export default authSlice.reducer;
export const { Logout } = authSlice.actions;
