import { createSlice } from "@reduxjs/toolkit";
import { addToCartAction, cartitemRemoveAction, getCartItemsAction, updateCartItemsAction } from "../action/cartAction";


const initialState = {
    addToCartMSG: null,
    addToCartPENDING: false,
    addToCartERROR: null,
    getCartItemsPENDING: false,
    getCartItemsData: null,
    getCartItemsDataSuccess: false,
    removeCartItemsMSG: null,
    updateCartItemsMSG: null,
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
            state.getCartItemsDataSuccess = false;
        })

        builder.addCase(getCartItemsAction.fulfilled, (state, { payload }) => {
            state.getCartItemsPENDING = false;
            state.getCartItemsData = payload;
            state.getCartItemsDataSuccess = true;
        })

        builder.addCase(getCartItemsAction.rejected, (state, { payload }) => {
            state.getCartItemsPENDING = false;
            state.getCartItemsData = null;
            state.getCartItemsDataSuccess = false;
        })

        builder.addCase(cartitemRemoveAction.pending, (state, { payload }) => {
            state.removeCartItemsMSG = null;
        })

        builder.addCase(cartitemRemoveAction.fulfilled, (state, { payload }) => {
            state.removeCartItemsMSG = payload;
        })

        builder.addCase(cartitemRemoveAction.rejected, (state, { payload }) => {
            state.removeCartItemsMSG = null;
        })
        
        builder.addCase(updateCartItemsAction.pending, (state, { payload }) => {
            state.updateCartItemsMSG = null;
        })

        builder.addCase(updateCartItemsAction.fulfilled, (state, { payload }) => {
            state.updateCartItemsMSG = payload;
        })

        builder.addCase(updateCartItemsAction.rejected, (state, { payload }) => {
            state.updateCartItemsMSG = null;
        })
    }
});

export default cartSlice.reducer;
