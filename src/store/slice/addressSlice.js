
import { createSlice } from "@reduxjs/toolkit";
import { createAddressAction, deleteAddressAction, getUserAddressAction } from "../action/addressAction";


const initialState = {
    createAddressMSG: null,
    createAddressPENDING: false,
    UserAddress: [],
    UserAddressSuccess: false,
    UserAddressPENDING: false,
    deleteAddressMSG: null,
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
            state.UserAddressSuccess = false;
        })

        builder.addCase(getUserAddressAction.fulfilled, (state, { payload }) => {
            state.UserAddress = payload;
            state.UserAddressPENDING = false;
            state.UserAddressSuccess = true;
        })

        builder.addCase(getUserAddressAction.rejected, (state, { payload }) => {
            state.UserAddress = null;
            state.UserAddressPENDING = false;
            state.UserAddressSuccess = false;
        })

        builder.addCase(deleteAddressAction.pending, (state, { payload }) => {
            state.deleteAddressMSG = null;
        })

        builder.addCase(deleteAddressAction.fulfilled, (state, { payload }) => {
            state.deleteAddressMSG = payload;
        })

        builder.addCase(deleteAddressAction.rejected, (state, { payload }) => {
            state.deleteAddressMSG = null;
        })

    }
});

export default addressSlice.reducer;
