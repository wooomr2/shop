import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  brands: [],
  brand: {},
  isLoading: false,
  error: null,
};


export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get(`/brands`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getBrand = createAsyncThunk(
  "brand/getBrand",
  async (name, thunkAPI) => {
    try {
      const res = await axios.get(`/brands/${name}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: {
    [getBrands.pending]: (state) => {
      state.isLoading = true;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.brands = action.payload.brands;
      state.isLoading = false;
    },
    [getBrands.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [getBrand.pending]: (state) => {
      state.isLoading = true;
    },
    [getBrand.fulfilled]: (state, action) => {
      state.brand = action.payload.brand;
      state.isLoading = false;
    },
    [getBrand.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const {} = brandSlice.actions;

export default brandSlice.reducer;
