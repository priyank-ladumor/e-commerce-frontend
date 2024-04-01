
import { createSlice } from "@reduxjs/toolkit";
import { getBannerAction, getLogoAction } from "../action/bannerLogoAction";



const initialState = {
    getBannerPENDING: false,
    getBannerDATA: null,
    getLogoDATA: null,
    getLogoPENDING: false,
};

const bannerLogoSlice = createSlice({
    name: "bannerLogo",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getBannerAction.pending, (state, { payload }) => {
            state.getBannerDATA = null;
            state.getBannerPENDING = true;
        })

        builder.addCase(getBannerAction.fulfilled, (state, { payload }) => {
            state.getBannerDATA = payload;
            state.getBannerPENDING = false;
        })

        builder.addCase(getBannerAction.rejected, (state, { payload }) => {
            state.getBannerDATA = null;
            state.getBannerPENDING = false;
        })

        builder.addCase(getLogoAction.pending, (state, { payload }) => {
            state.getLogoDATA = null;
            state.getLogoPENDING = true;
        })

        builder.addCase(getLogoAction.fulfilled, (state, { payload }) => {
            state.getLogoDATA = payload;
            state.getLogoPENDING = false;
        })

        builder.addCase(getLogoAction.rejected, (state, { payload }) => {
            state.getLogoDATA = null;
            state.getLogoPENDING = false;
        })
    }
});

export default bannerLogoSlice.reducer;
