import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";
import authSlice from "./slice/authSlice";
import categorySlice from "./slice/categorySlice";



const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    category: categorySlice,
  },
});

export default store;
