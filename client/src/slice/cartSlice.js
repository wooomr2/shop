import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`/carts/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addCartItems = createAsyncThunk(
  "cart/addCartItems",
  async (cartItems, thunkAPI) => {
    try {
      let user = JSON.parse(sessionStorage.getItem("user"));
      user = user._id;

      cartItems = cartItems.map((cartItem) => {
        return { product: cartItem._id, quantity: cartItem.qty };
      });

      console.log({ user, cartItems });
      const res = await axios.post("/carts", { user, cartItems });
      if (res.status === 201) thunkAPI.dispatch(getCartItems(user));

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateCartItems = createAsyncThunk(
  "cart/updateCartItems",
  async (cartItems, thunkAPI) => {
    try {
      let user = JSON.parse(sessionStorage.getItem("user"));
      user = user._id;

      cartItems = cartItems.map((cartItem) => {
        return { product: cartItem._id, quantity: cartItem.qty };
      });

      const res = await axios.put("/carts", { user, cartItems });
      if (res.status === 201) thunkAPI.dispatch(getCartItems());

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem
        ? (cartItem.qty += 1)
        : (state.cartItems = [...state.cartItems, action.payload]);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const _id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== _id);
    },
    increaseQty: (state, action) => {
      const _id = action.payload;
      const cartItem = state.cartItems.find((item) => item._id === _id);
      cartItem.qty += 1;
    },
    decreaseQty: (state, action) => {
      const _id = action.payload;
      const cartItem = state.cartItems.find((item) => item._id === _id);
      cartItem.qty -= 1;
    },
  },

  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.cartItems;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [addCartItems.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [addCartItems.rejected]: (state) => {
      state.isLoading = false;
    },

    [updateCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCartItems.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addItem, clearCart, removeItem, increaseQty, decreaseQty } =
  cartSlice.actions;

//Selector
export const selectTotalQty = (store) =>
  store.cart.cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);

export const selectTotalPrice = (state) =>
  state.cart.cartItems.reduce(
    (totalPrice, item) => totalPrice + item.price * item.qty,
    0
  );

export default cartSlice.reducer;
