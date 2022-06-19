import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { clearCart } from "./cartSlice";

const initialState = {
  addresses: [],
  shippingAddress: {},
  orders: [],
  order: {},
  latestOrder: {},
  // orderDetails: {},
  isLoading: false,
};

export const getAddress = createAsyncThunk(
  "user/getAddress",
  async (uid, thunkAPI) => {
    try {
      const res = await axios.get(`/address/${uid}`);
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
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios.patch(`/address`, { user, address });
      // console.log(res.data);
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
  async (uid, thunkAPI) => {
    try {
      const res = await axios.get(`/orders`);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // clearLatestOrder: (state)=> {
    //   state.latestOrder = {}
    // }
  },
  extraReducers: {
    [getAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [getAddress.fulfilled]: (state, action) => {
      state.addresses = action.payload.userAddress.address;
      state.isLoading = false;
    },
    [getAddress.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [upsertAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [upsertAddress.fulfilled]: (state, action) => {
      state.addresses = action.payload.userAddress.address;
      state.isLoading = false;
    },
    [upsertAddress.rejected]: (state, action) => {
      state.isLoading = false;
    },

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
      state.shippingAddress = action.payload.shippingAddress;
      state.isLoading = false;
    },
    [getOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [addOrder.fulfilled]: (state, action) => {
      // state.orders = [...state.orders, action.payload.order];
      state.latestOrder = action.payload.order;
      state.isLoading = false;
    },
    [addOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { clearLatestOrder } = userSlice.actions;

export default userSlice.reducer;
