import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get(`/carts`);
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
      cartItems = cartItems.map((cartItem) => {
        return {
          product: cartItem._id,
          size: cartItem.size,
          qty: cartItem.qty,
        };
      });
      const res = await axios.post("/carts", cartItems);
      if (res.status === 201) thunkAPI.dispatch(getCartItems());

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
      cartItems = cartItems.map((cartItem) => {
        return {
          product: cartItem._id,
          size: cartItem.size,
          qty: cartItem.qty,
        };
      });

      const res = await axios.put("/carts", cartItems);

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
      const { _id, size, qty } = action.payload;

      const cartItem = state.cartItems.find(
        (item) => item._id === _id && item.size === size
      );
      cartItem
        ? (cartItem.qty += qty)
        : (state.cartItems = [...state.cartItems, action.payload]);
    },

    clearCart: (state, action) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      const { _id, size } = action.payload;

      state.cartItems = state.cartItems.filter((item) => {
        if (item._id === _id) return item.size !== size;
        else return item._id !== _id;
      });
    },

    increaseQty: (state, action) => {
      const { _id, size } = action.payload;

      const cartItem = state.cartItems.find(
        (item) => item._id === _id && item.size === size
      );
      cartItem.qty += 1;
    },

    decreaseQty: (state, action) => {
      const { _id, size } = action.payload;

      const cartItem = state.cartItems.find(
        (item) => item._id === _id && item.size === size
      );
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
