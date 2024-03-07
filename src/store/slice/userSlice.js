
import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAction } from "../action/userAction";


const initialState = {
    getUserProfileDATA: null,
    getUserProfilePENDING: false,
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
    }
});

export default userSlice.reducer;
