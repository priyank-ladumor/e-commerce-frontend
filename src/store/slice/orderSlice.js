
import { createSlice } from "@reduxjs/toolkit";
import { CancelOrderAction, DeleteOrderAction, checkAvailableQuantityAction, createOrderAction, findAllUserOrderAction } from "../action/orderAction";


const initialState = {
    createOrderMSG: null,
    createOrderERROR: null,
    createOrderPENDING: false,
    createOrderSTRIPE_ID: null,
    getAllOrderData: null,
    getAllOrderPENDING: false,
    getAllOrderSUCCESS: false,
    DeleteOrderMSG: null,
    CancelOrderMSG: null,
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
            state.createOrderSTRIPE_ID = null;
        })

        builder.addCase(createOrderAction.fulfilled, (state, { payload }) => {
            state.createOrderMSG = payload.msg;
            state.createOrderSTRIPE_ID = payload.id;
            state.createOrderPENDING = false;
            state.createOrderERROR = null;
        })

        builder.addCase(createOrderAction.rejected, (state, { payload }) => {
            state.createOrderMSG = null;
            state.createOrderSTRIPE_ID = null;
            state.createOrderPENDING = false;
            state.createOrderERROR = payload;
        })

        builder.addCase(findAllUserOrderAction.pending, (state, { payload }) => {
            state.getAllOrderData = null;
            state.getAllOrderPENDING = true;
            state.getAllOrderSUCCESS = false;
        })

        builder.addCase(findAllUserOrderAction.fulfilled, (state, { payload }) => {
            state.getAllOrderData = payload;
            state.getAllOrderPENDING = false;
            state.getAllOrderSUCCESS = true;
        })

        builder.addCase(findAllUserOrderAction.rejected, (state, { payload }) => {
            state.getAllOrderData = null;
            state.getAllOrderPENDING = false;
            state.getAllOrderSUCCESS = false;
        })
   
        builder.addCase(DeleteOrderAction.pending, (state, { payload }) => {
            state.DeleteOrderMSG = null;
        })

        builder.addCase(DeleteOrderAction.fulfilled, (state, { payload }) => {
            state.DeleteOrderMSG = payload;
        })

        builder.addCase(DeleteOrderAction.rejected, (state, { payload }) => {
            state.DeleteOrderMSG = null;
        })
    
        builder.addCase(CancelOrderAction.pending, (state, { payload }) => {
            state.CancelOrderMSG = null;
        })

        builder.addCase(CancelOrderAction.fulfilled, (state, { payload }) => {
            state.CancelOrderMSG = payload;
        })

        builder.addCase(CancelOrderAction.rejected, (state, { payload }) => {
            state.CancelOrderMSG = null;
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
