import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  income: [],
  total: 0,
  orders: [],
  order: {},
  isLoading: false,
};

export const getMonthlyIncome = createAsyncThunk(
  "user/getMonthlyIncome",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/orders/income`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/orders/getAdmin`, payload);
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
    [getMonthlyIncome.pending]: (state) => {
      state.isLoading = true;
    },
    [getMonthlyIncome.fulfilled]: (state, action) => {
      state.income = action.payload.income;
      state.isLoading = false;
    },
    [getMonthlyIncome.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.total = action.payload.total;
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
