import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";
import authSlice from "./slice/authSlice";
import categorySlice from "./slice/categorySlice";
import sizeSlice from "./slice/sizeSlice";
import cartSlice from "./slice/cartSlice";



const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    category: categorySlice,
    size: sizeSlice,
    cart: cartSlice,
  },
});

export default store;
