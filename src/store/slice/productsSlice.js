import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../action/productsAction";


const initialState = {
    products: [],
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        Logout: (state) => {
            // state.isuserToken = null;
            // state.issuccess = false;
            // state.success = false;
            // state.isrefresh = true;
            // localStorage.clear();
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getProducts.pending, (state, { payload }) => {
            state.products = null;
        })

        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.products = payload;
        })

        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.products = null;
        })
    }
});

export default productsSlice.reducer;
export const { Logout } = productsSlice.actions;
