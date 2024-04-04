import { createSlice } from "@reduxjs/toolkit";
import { getNavbarByTopAction, getsecondlevelCategoryAction, getthirdlevelCategoryAction, getthirdlevelCategoryFilterAction, gettoplevelCategoryAction } from "../action/categoryAction";


const initialState = {
    categoryTop: null,
    categoryTopPENDING: false,
    categorySecond: null,
    categoryThird: null,
    categoryThirdFilter: null,
    getNavbarByTopPENDING: false,
    getNavbarByTopDATA: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(gettoplevelCategoryAction.pending, (state, { payload }) => {
            state.categoryTop = null;
            state.categoryTopPENDING = true;
        })

        builder.addCase(gettoplevelCategoryAction.fulfilled, (state, { payload }) => {
            state.categoryTop = payload;
            state.categoryTopPENDING = false;
        })

        builder.addCase(gettoplevelCategoryAction.rejected, (state, { payload }) => {
            state.categoryTop = null;
            state.categoryTopPENDING = false;
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
  
        builder.addCase(getthirdlevelCategoryFilterAction.pending, (state, { payload }) => {
            state.categoryThirdFilter = null;
        })

        builder.addCase(getthirdlevelCategoryFilterAction.fulfilled, (state, { payload }) => {
            state.categoryThirdFilter = payload;
        })

        builder.addCase(getthirdlevelCategoryFilterAction.rejected, (state, { payload }) => {
            state.categoryThirdFilter = null;
        })

        builder.addCase(getNavbarByTopAction.pending, (state, { payload }) => {
            state.getNavbarByTopDATA = null;
            state.getNavbarByTopPENDING = true;
        })

        builder.addCase(getNavbarByTopAction.fulfilled, (state, { payload }) => {
            state.getNavbarByTopDATA = payload;
            state.getNavbarByTopPENDING = false;

        })

        builder.addCase(getNavbarByTopAction.rejected, (state, { payload }) => {
            state.getNavbarByTopDATA = null;
            state.getNavbarByTopPENDING = false;
        })
    }
});

export default categorySlice.reducer;
