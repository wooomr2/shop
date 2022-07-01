import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  orders: [],
  order: {},
  isLoading: false,
};

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get(`/orders`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/orders/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (form, thunkAPI) => {
    try {
      const res = await axios.patch(`/orders`, form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload.orders;
      state.isLoading = false;
    },
    [getOrders.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.order = action.payload.order;
      state.isLoading = false;
    },
    [getOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [updateOrder.fulfilled]: (state, action) => {
      const { updatedOrder } = action.payload;
      state.orders = state.orders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      );
      state.isLoading = false;
    },
    [updateOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const {} = orderSlice.actions;

export default orderSlice.reducer;
