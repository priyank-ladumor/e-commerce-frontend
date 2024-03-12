
import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAction, resetPasswordAction, updateUserProfileAction } from "../action/userAction";


const initialState = {
    getUserProfileDATA: null,
    getUserProfilePENDING: false,
    updateUserProfileMSG: null,
    updateUserProfilePENDING: false,
    resetPasswordMSG: null,
    resetPasswordERROR: null,
    resetPasswordPENDING: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getUserProfileAction.pending, (state, { payload }) => {
            state.getUserProfileDATA = null;
            state.getUserProfilePENDING = true;
        })

        builder.addCase(getUserProfileAction.fulfilled, (state, { payload }) => {
            state.getUserProfileDATA = payload;
            state.getUserProfilePENDING = false;
        })

        builder.addCase(getUserProfileAction.rejected, (state, { payload }) => {
            state.getUserProfileDATA = null;
            state.getUserProfilePENDING = false;
        })
   
        builder.addCase(updateUserProfileAction.pending, (state, { payload }) => {
            state.updateUserProfileMSG = null;
            state.updateUserProfilePENDING = true;
        })

        builder.addCase(updateUserProfileAction.fulfilled, (state, { payload }) => {
            state.updateUserProfileMSG = payload;
            state.updateUserProfilePENDING = false;
        })

        builder.addCase(updateUserProfileAction.rejected, (state, { payload }) => {
            state.updateUserProfileMSG = null;
            state.updateUserProfilePENDING = false;
        })

        builder.addCase(resetPasswordAction.pending, (state, { payload }) => {
            state.resetPasswordMSG = null;
            state.resetPasswordPENDING = true;
            state.resetPasswordERROR = null;
        })

        builder.addCase(resetPasswordAction.fulfilled, (state, { payload }) => {
            state.resetPasswordMSG = payload;
            state.resetPasswordPENDING = false;
            state.resetPasswordERROR = null;
        })

        builder.addCase(resetPasswordAction.rejected, (state, { payload }) => {
            state.resetPasswordMSG = null;
            state.resetPasswordPENDING = false;
            state.resetPasswordERROR = payload;
        })
    }
});

export default userSlice.reducer;
