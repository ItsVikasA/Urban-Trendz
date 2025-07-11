import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity,size }) => {
    console.log("from-slice",size)
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
      {
        userId,
        productId,
        quantity,
        size
      }
    );
    return response.data;
  }
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ userId }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`,
      {
          withCredentials : true,
        }
    );
    return response.data;
  }
);

export const upadteCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/update-quantity`,
      {
        userId,
        productId,
        quantity,
      },
      {
          withCredentials : true,
        }
    );
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/cart/delete/${userId}/${productId}`,
      {
          withCredentials : true,
        }
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(upadteCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upadteCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(upadteCartItemQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
