import { createSlice } from "@reduxjs/toolkit";
import { getKidsProductAction, getMensProductAction, getProducts, getProductsByIDAction, getWomensProductAction } from "../action/productsAction";


const initialState = {
    products: [],
    getFilterProductPENDING: false,
    productsDetailsPENDING: false,
    productsDetails: null,
    menProducts: [],
    menProductsPENDING: false,
    womenProducts: [],
    kidsProducts: [],
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
    
        builder.addCase(getMensProductAction.pending, (state, { payload }) => {
            state.menProducts = null;
            state.menProductsPENDING = true;
        })

        builder.addCase(getMensProductAction.fulfilled, (state, { payload }) => {
            state.menProducts = payload;
            state.menProductsPENDING = false;
        })

        builder.addCase(getMensProductAction.rejected, (state, { payload }) => {
            state.menProducts = null;
            state.menProductsPENDING = false;
        })
       
        builder.addCase(getWomensProductAction.pending, (state, { payload }) => {
            state.womenProducts = null;
        })

        builder.addCase(getWomensProductAction.fulfilled, (state, { payload }) => {
            state.womenProducts = payload;
        })

        builder.addCase(getWomensProductAction.rejected, (state, { payload }) => {
            state.womenProducts = null;
        })
      
        builder.addCase(getKidsProductAction.pending, (state, { payload }) => {
            state.kidsProducts = null;
        })

        builder.addCase(getKidsProductAction.fulfilled, (state, { payload }) => {
            state.kidsProducts = payload;
        })

        builder.addCase(getKidsProductAction.rejected, (state, { payload }) => {
            state.kidsProducts = null;
        })
    }
});

export default productsSlice.reducer;
