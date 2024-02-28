import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductsByIDAction } from "../action/productsAction";


const initialState = {
    products: [],
    getFilterProductPENDING: false,
    productsDetails: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getProducts.pending, (state, { payload }) => {
            state.products = null;
            state.getFilterProductPENDING = true;
        })

        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.products = payload;
            state.getFilterProductPENDING = false;
        })

        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.products = null;
            state.getFilterProductPENDING = false;
        })

        builder.addCase(getProductsByIDAction.pending, (state, { payload }) => {
            state.productsDetails = null;
        })

        builder.addCase(getProductsByIDAction.fulfilled, (state, { payload }) => {
            state.productsDetails = payload;
        })

        builder.addCase(getProductsByIDAction.rejected, (state, { payload }) => {
            state.productsDetails = null;
        })
    }
});

export default productsSlice.reducer;
