import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  total: 0,
  brandData: [],
  products: [],
  product: {},
  relatedProducts: [],
  isLoading: false,
};

export const getProductsByCategories = createAsyncThunk(
  "product/getProductsByCategories",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/products/cate`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/products/get`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductsByCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByCategories.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.products = action.payload.products;
      state.brandData = action.payload.brandData;
      state.isLoading = false;
    },
    [getProductsByCategories.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.products = action.payload.products;
      state.brandData = [];
      state.isLoading = false;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.relatedProducts = action.payload.relatedProducts;
      state.isLoading = false;
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const { } = productSlice.actions;

export default productSlice.reducer;
