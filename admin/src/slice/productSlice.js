import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/products");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/products", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (form, thunkAPI) => {
    try {
      const res = await axios.patch("/products", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/products/${id}`);
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
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.isLoading = false;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [addProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.products = [action.payload.product, ...state.products];
      state.isLoading = false;
    },
    [addProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      const { updatedProduct } = action.payload;
      state.products = state.products.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      );
      state.isLoading = false;
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product._id !== id);
      state.isLoading = false;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
