import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";
import authSlice from "./slice/authSlice";
import categorySlice from "./slice/categorySlice";
import sizeSlice from "./slice/sizeSlice";
import cartSlice from "./slice/cartSlice";
import userSlice from "./slice/userSlice";
import addressSlice from "./slice/addressSlice";
import orderSlice from "./slice/orderSlice";



const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    category: categorySlice,
    size: sizeSlice,
    cart: cartSlice,
    user: userSlice,
    address: addressSlice,
    order: orderSlice,
  },
});

export default store;
