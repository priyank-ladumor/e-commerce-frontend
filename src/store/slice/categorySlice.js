import { createSlice } from "@reduxjs/toolkit";
import { getsecondlevelCategoryAction, getthirdlevelCategoryAction, gettoplevelCategoryAction } from "../action/categoryAction";


const initialState = {
    categoryTop: null,
    categorySecond: null,
    categoryThird: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(gettoplevelCategoryAction.pending, (state, { payload }) => {
            state.categoryTop = null;
        })

        builder.addCase(gettoplevelCategoryAction.fulfilled, (state, { payload }) => {
            state.categoryTop = payload;
        })

        builder.addCase(gettoplevelCategoryAction.rejected, (state, { payload }) => {
            state.categoryTop = null;
        })
     
        builder.addCase(getsecondlevelCategoryAction.pending, (state, { payload }) => {
            state.categorySecond = null;
        })

        builder.addCase(getsecondlevelCategoryAction.fulfilled, (state, { payload }) => {
            state.categorySecond = payload;
        })

        builder.addCase(getsecondlevelCategoryAction.rejected, (state, { payload }) => {
            state.categorySecond = null;
        })

        builder.addCase(getthirdlevelCategoryAction.pending, (state, { payload }) => {
            state.categoryThird = null;
        })

        builder.addCase(getthirdlevelCategoryAction.fulfilled, (state, { payload }) => {
            state.categoryThird = payload;
        })

        builder.addCase(getthirdlevelCategoryAction.rejected, (state, { payload }) => {
            state.categoryThird = null;
        })

    }
});

export default categorySlice.reducer;
