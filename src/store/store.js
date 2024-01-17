import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";
import authSlice from "./slice/authSlice";



const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
  },
});

export default store;
