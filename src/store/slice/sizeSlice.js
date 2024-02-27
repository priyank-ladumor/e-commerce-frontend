
import { createSlice } from "@reduxjs/toolkit";
import { getSizesAction } from "../action/sizeAction";


const initialState = {
    getSizesPENDING: false,
    getSizesDATA: null,
};

const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getSizesAction.pending, (state, { payload }) => {
            state.getSizesDATA = null;
            state.getSizesPENDING = true;
        })

        builder.addCase(getSizesAction.fulfilled, (state, { payload }) => {
            state.getSizesDATA = payload;
            state.getSizesPENDING = false;
        })

        builder.addCase(getSizesAction.rejected, (state, { payload }) => {
            state.getSizesDATA = null;
            state.getSizesPENDING = false;
        })
    }
});

export default sizeSlice.reducer;
