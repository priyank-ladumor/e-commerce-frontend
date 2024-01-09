import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});
export default store;
