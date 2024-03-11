
import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAction, updateUserProfileAction } from "../action/userAction";


const initialState = {
    getUserProfileDATA: null,
    getUserProfilePENDING: false,
    updateUserProfileMSG: null,
    updatedSuccess: false,
    updateUserProfilePENDING: false,
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
            state.updatedSuccess = false;
        })

        builder.addCase(updateUserProfileAction.fulfilled, (state, { payload }) => {
            state.updateUserProfileMSG = payload;
            state.updateUserProfilePENDING = false;
            state.updatedSuccess = true;
        })

        builder.addCase(updateUserProfileAction.rejected, (state, { payload }) => {
            state.updateUserProfileMSG = null;
            state.updateUserProfilePENDING = false;
            state.updatedSuccess = false;
        })
    }
});

export default userSlice.reducer;
