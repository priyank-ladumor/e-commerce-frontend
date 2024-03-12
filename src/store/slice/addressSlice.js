
import { createSlice } from "@reduxjs/toolkit";
import { createAddressAction, getUserAddressAction } from "../action/addressAction";


const initialState = {
    createAddressMSG: null,
    createAddressPENDING: false,
    UserAddress: [],
    UserAddressPENDING: false,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(createAddressAction.pending, (state, { payload }) => {
            state.createAddressMSG = null;
            state.createAddressPENDING = true;
        })

        builder.addCase(createAddressAction.fulfilled, (state, { payload }) => {
            state.createAddressMSG = payload;
            state.createAddressPENDING = false;
        })

        builder.addCase(createAddressAction.rejected, (state, { payload }) => {
            state.createAddressMSG = null;
            state.createAddressPENDING = false;
        })

        builder.addCase(getUserAddressAction.pending, (state, { payload }) => {
            state.UserAddress = null;
            state.UserAddressPENDING = true;
        })

        builder.addCase(getUserAddressAction.fulfilled, (state, { payload }) => {
            state.UserAddress = payload;
            state.UserAddressPENDING = false;
        })

        builder.addCase(getUserAddressAction.rejected, (state, { payload }) => {
            state.UserAddress = null;
            state.UserAddressPENDING = false;
        })

    }
});

export default addressSlice.reducer;
