import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";
import authSlice from "./slice/authSlice";
import categorySlice from "./slice/categorySlice";
import sizeSlice from "./slice/sizeSlice";



const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    category: categorySlice,
    size: sizeSlice,
  },
});

export default store;
