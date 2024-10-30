import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch products from api
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  }
);

//fetch single Product Details
// export const fetchSingleProducts = createAsyncThunk(
//   "products/fetchSingleProducts",
//   async (id) => {
//     const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
//     return res.data;
//   }
// );

// fetch category
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products/categories");
    return res.data;
  }
);

export const fetchProductByCategory = createAsyncThunk(
  "products/fetchProductByCategory",
  async (category) => {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    return res.data;
  }
);

export const fetchSortedProduct = createAsyncThunk(
  "products/fetchSortedProduct",
  async (sort) => {
    const res = await axios.get(
      `https://fakestoreapi.com/products?sort=${sort}`
    );
    return res.data;
  }
);

export const fetchProductInLimit = createAsyncThunk(
  "products/fetchProductInLimit",
  async (limit) => {
    const res = await axios.get(
      `https://fakestoreapi.com/products?limit=${limit}`
    );
    return res.data;
  }
);

function calculateTotal(product) {
  const total = product.reduce((acc, cur) => cur.price * cur.quantity + acc, 0);
  return total;
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    originalItems: [], // there is no functionality for filter by name in api. that't why i am adding this another state.
    items: [],
    categories: [],
    cart: [],
    totalAmount: 0,
    status: "idle",
    error: null,
    filter: false,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.items = state.originalItems.filter((prd) =>
        prd.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setPriceRange(state, action) {
      state.items = state.originalItems.filter(
        (prd) =>
          prd.price >= action.payload.min && prd.price <= action.payload.max
      );
      state.filter = true;
    },
    // cart
    AddToCart(state, action) {
      state.cart.push(action.payload);
      state.totalAmount = calculateTotal(state.cart);
    },
    incrementQuantity(state, action) {
      const newCart = state.cart.map((el) => {
        if (el.id == +action.payload) {
          return { ...el, quantity: el.quantity + 1 };
        } else return el;
      });
      state.cart = newCart;
      state.totalAmount = calculateTotal(state.cart);
    },
    decrementQuantity(state, action) {
      const newCart = state.cart.map((el) => {
        if (el.id == +action.payload) {
          return { ...el, quantity: el.quantity - 1 };
        } else return el;
      });
      state.cart = newCart;
      state.totalAmount = calculateTotal(state.cart);
    },

    RemoveFromCart(state, action) {
      console.log(action.payload);
      const newcart = state.cart.filter((item) => item.id !== +action.payload);
      console.log(newcart);
      state.cart = newcart;
    },
    EmptyCart(state) {
      state.cart = [];
      state.totalAmount = 0
    },
    // reset Filter
    ResetFilter(state) {
      state.items = state.originalItems;
      state.filter = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.originalItems = action.payload; // Reason of adding this is to perform filter action in front-end , because no way in the api
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch single products
      // .addCase(fetchSingleProducts.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.items = action.payload;
      //   state.originalItems = action.payload;
      // })

      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // product by categories
      .addCase(fetchProductByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
        state.filter = true;
      })
      // sorted products
      .addCase(fetchSortedProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSortedProduct.fulfilled, (state, action) => {
        state.items = action.payload;
        state.originalItems = action.payload; // Reason of adding this is to perform filter action in front-end , because no way in the api
        state.status = "succeeded";
      })
      // limit products
      .addCase(fetchProductInLimit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductInLimit.fulfilled, (state, action) => {
        state.items = action.payload;
        state.originalItems = action.payload; // Reason of adding this is to perform filter action in front-end , because no way in the api
        state.status = "succeeded";
      });
  },
});

export const {
  setSearchQuery,
  setPriceRange,
  AddToCart,
  RemoveFromCart,
  ResetFilter,
  EmptyCart,
  incrementQuantity,
  decrementQuantity,
} = productSlice.actions;
export default productSlice.reducer;
