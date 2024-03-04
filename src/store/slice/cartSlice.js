import { createSlice } from "@reduxjs/toolkit";
import { addToCartAction, getCartItemsAction } from "../action/cartAction";


const initialState = {
    addToCartMSG: null,
    addToCartPENDING: false,
    addToCartERROR: null,
    getCartItemsPENDING: false,
    getCartItemsData: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addToCartAction.pending, (state, { payload }) => {
            state.addToCartPENDING = true;
            state.addToCartMSG = null;
            state.addToCartERROR = null;
        })

        builder.addCase(addToCartAction.fulfilled, (state, { payload }) => {
            state.addToCartPENDING = false;
            state.addToCartMSG = payload;
            state.addToCartERROR = null;
        })

        builder.addCase(addToCartAction.rejected, (state, { payload }) => {
            state.addToCartPENDING = false;
            state.addToCartMSG = null;
            state.addToCartERROR = payload;
        })
 
        builder.addCase(getCartItemsAction.pending, (state, { payload }) => {
            state.getCartItemsPENDING = true;
            state.getCartItemsData = null;
        })

        builder.addCase(getCartItemsAction.fulfilled, (state, { payload }) => {
            state.getCartItemsPENDING = false;
            state.getCartItemsData = payload;
        })

        builder.addCase(getCartItemsAction.rejected, (state, { payload }) => {
            state.getCartItemsPENDING = false;
            state.getCartItemsData = null;
        })
    }
});

export default cartSlice.reducer;
