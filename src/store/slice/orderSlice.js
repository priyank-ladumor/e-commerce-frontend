
import { createSlice } from "@reduxjs/toolkit";
import { createOrderAction } from "../action/orderAction";


const initialState = {
    createOrderMSG: null,
    createOrderPENDING: false,
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
        })

        builder.addCase(createOrderAction.fulfilled, (state, { payload }) => {
            state.createOrderMSG = payload;
            state.createOrderPENDING = false;
        })

        builder.addCase(createOrderAction.rejected, (state, { payload }) => {
            state.createOrderMSG = null;
            state.createOrderPENDING = false;
        })

    }
});

export default orderSlice.reducer;
