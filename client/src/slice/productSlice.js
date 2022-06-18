import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  relatedProducts:[],
  product: {},
  products: [],
  brandData: [],
  total: 0,
  perPage: 20,
  _currentPage: 1,
  _sort: "latest",
  _brands: [], //checked brands
  _brand: "",
  isLoading: false,
};

export const getProductsByCategories = createAsyncThunk(
  "product/getProductsByCategories",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/products/cate`, payload);
      thunkAPI.dispatch(saveFeatures(payload));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProductsByBrand = createAsyncThunk(
  "product/getProductsByBrand",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/products/brand`, payload);
      thunkAPI.dispatch(saveFeatures(payload));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProductsByKeyword = createAsyncThunk(
  "product/getProductsByKeyword",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/products/keyword`, payload);
      thunkAPI.dispatch(saveFeatures(payload));
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
  reducers: {
    saveFeatures: (state, action) => {
      state._currentPage=action.payload.currentPage;
      state._sort=action.payload.sort;
      state._brands=action.payload.brands;
      state._brand=action.payload.brand;
    },
    clearFeatures: (state, action)=> {
      state._currentPage= 1;
      state._sort= "latest";
      state._brands= [];
      state._brand= "";
    }
  },
  extraReducers: {
    [getProductsByCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByCategories.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.brandData = action.payload.brandData;
      state.total = action.payload.total;
      state.isLoading = false;
    },
    [getProductsByCategories.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getProductsByBrand.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByBrand.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.brandData = [];
      state.total = action.payload.total;
      state.isLoading = false;
    },
    [getProductsByBrand.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getProductsByKeyword.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByKeyword.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.brandData = [];
      state.total = action.payload.total;
      state.isLoading = false;
    },
    [getProductsByKeyword.rejected]: (state, action) => {
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

export const { saveFeatures,clearFeatures } = productSlice.actions;

export default productSlice.reducer;
