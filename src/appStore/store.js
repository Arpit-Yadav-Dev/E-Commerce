import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/products/productsSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
