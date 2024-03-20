
import { createSlice } from "@reduxjs/toolkit";
import { checkAvailableQuantityAction, createOrderAction, findAllUserOrderAction } from "../action/orderAction";


const initialState = {
    createOrderMSG: null,
    createOrderERROR: null,
    createOrderPENDING: false,
    getAllOrderData: null,
    getAllOrderPENDING: false,
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

        builder.addCase(findAllUserOrderAction.pending, (state, { payload }) => {
            state.getAllOrderData = null;
            state.getAllOrderPENDING = true;
        })

        builder.addCase(findAllUserOrderAction.fulfilled, (state, { payload }) => {
            state.getAllOrderData = payload;
            state.getAllOrderPENDING = false;
        })

        builder.addCase(findAllUserOrderAction.rejected, (state, { payload }) => {
            state.getAllOrderData = null;
            state.getAllOrderPENDING = false;
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
