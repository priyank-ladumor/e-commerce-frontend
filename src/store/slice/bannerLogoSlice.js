
import { createSlice } from "@reduxjs/toolkit";
import { getBannerAction } from "../action/bannerLogoAction";



const initialState = {
    getBannerPENDING: false,
    getBannerDATA: null,

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
    }
});

export default bannerLogoSlice.reducer;
