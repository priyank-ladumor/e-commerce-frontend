
import { createSlice } from "@reduxjs/toolkit";
import { checkAvailableQuantityAction, createOrderAction } from "../action/orderAction";


const initialState = {
    createOrderMSG: null,
    createOrderERROR: null,
    createOrderPENDING: false,
    checkAvailableQuantityMSG: [],
    checkAvailableQuantityERROR: null,
    checkAvailableQuantityPENDING: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(createOrderAction.pending, (state, { payload }) => {
            state.createOrderMSG = null;
            state.createOrderPENDING = true;
            state.createOrderERROR = null;
        })

        builder.addCase(createOrderAction.fulfilled, (state, { payload }) => {
            state.createOrderMSG = payload;
            state.createOrderPENDING = false;
            state.createOrderERROR = null;
        })

        builder.addCase(createOrderAction.rejected, (state, { payload }) => {
            state.createOrderMSG = null;
            state.createOrderPENDING = false;
            state.createOrderERROR = payload;
        })
      
        builder.addCase(checkAvailableQuantityAction.pending, (state, { payload }) => {
            state.checkAvailableQuantityMSG = null;
            state.checkAvailableQuantityERROR = null;
            state.checkAvailableQuantityPENDING = true;
        })

        builder.addCase(checkAvailableQuantityAction.fulfilled, (state, { payload }) => {
            state.checkAvailableQuantityMSG = payload;
            state.checkAvailableQuantityERROR = null;
            state.checkAvailableQuantityPENDING = false;
        })

        builder.addCase(checkAvailableQuantityAction.rejected, (state, { payload }) => {
            state.checkAvailableQuantityMSG = null;
            state.checkAvailableQuantityERROR = payload;
            state.checkAvailableQuantityPENDING = false;
        })

    }
});

export default orderSlice.reducer;
