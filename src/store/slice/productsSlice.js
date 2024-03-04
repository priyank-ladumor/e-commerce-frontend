import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductsByIDAction } from "../action/productsAction";


const initialState = {
    products: [],
    getFilterProductPENDING: false,
    productsDetailsPENDING: false,
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
            state.productsDetailsPENDING = true;
        })

        builder.addCase(getProductsByIDAction.fulfilled, (state, { payload }) => {
            state.productsDetails = payload;
            state.productsDetailsPENDING = false;
        })

        builder.addCase(getProductsByIDAction.rejected, (state, { payload }) => {
            state.productsDetails = null;
            state.productsDetailsPENDING = false;
        })
    }
});

export default productsSlice.reducer;
