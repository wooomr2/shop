import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { clearCart } from "./cartSlice";

const initialState = {
  user: {},
  orderStats: {},
  total: 0,
  orders: [],
  order: {},
  addresses: [],
  isLoading: false,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get(`/users/id`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAddresses = createAsyncThunk(
  "user/getAddresses",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get(`/addresses`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const upsertAddress = createAsyncThunk(
  "user/upsertAddress",
  async (address, thunkAPI) => {
    try {
      const res = await axios.patch(`/addresses`, { address });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/addresses/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  "user/addOrder",
  async (order, thunkAPI) => {
    try {
      const res = await axios.post(`/orders`, order);
      if (res.status === 201) thunkAPI.dispatch(clearCart());
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/getOrders",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/orders/get`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "user/getOrder",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/orders/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrderStats = createAsyncThunk(
  "user/getOrderStats",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/orders/stats`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const refundRequest = createAsyncThunk(
  "user/refundRequest",
  async (_id, thunkAPI) => {
    try {
      const res = await axios.post(`/orders/refund`, { _id });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.addresses = action.payload.userAddress?.addresses;
      state.isLoading = false;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
    },

    /////////////////////////////////////////////////////////////////////

    [getAddresses.pending]: (state) => {
      state.isLoading = true;
    },
    [getAddresses.fulfilled]: (state, action) => {
      state.addresses = action.payload.userAddress?.addresses;
      state.isLoading = false;
    },
    [getAddresses.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [upsertAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [upsertAddress.fulfilled]: (state, action) => {
      state.addresses = action.payload.userAddress.addresses;
      state.isLoading = false;
    },
    [upsertAddress.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAddress.fulfilled]: (state, action) => {
      state.addresses = action.payload.userAddress.addresses;
      state.isLoading = false;
    },
    [deleteAddress.rejected]: (state, action) => {
      state.isLoading = false;
    },

    /////////////////////////////////////////////////////////////////////

    [addOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [addOrder.fulfilled]: (state, action) => {
      state.latestOrder = action.payload.order;
      state.isLoading = false;
    },
    [addOrder.rejected]: (state, action) => {
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

    [getOrderStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderStats.fulfilled]: (state, action) => {
      state.orderStats = action.payload.orderStats[0];
      state.isLoading = false;
    },
    [getOrderStats.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [refundRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [refundRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [refundRequest.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
