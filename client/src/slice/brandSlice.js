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

export const getNewBrands = createAsyncThunk(
  "brand/getNewBrands",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/brands/new");
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

    [getNewBrands.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewBrands.fulfilled]: (state, action) => {
      state.brands = action.payload.brands;
      state.isLoading = false;
    },
    [getNewBrands.rejected]: (state, action) => {
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

//Selector
export const selectRandomBrandImgs = (state) => {
  const brands = state.brand.brands;
  const idxArray = Array(brands?.length)
    .fill()
    .map((v, i) => i);

  let shuffles = [];
  for (let i = 0; i < 6; i++) {
    shuffles.push(idxArray.splice(Math.floor(Math.random() * idxArray?.length), 1)[0]);
  }
  
  // while (true) {
  //   shuffles.push(Math.floor(Math.random() * brands?.length), 1);

  //   const set = new Set(shuffles);
  //   if (set.size === 6) {
  //     shuffles = [...set];
  //     break;
  //   }
  // }
  
  const brandImgs = shuffles.map((i) => brands[i]?.banners[0].img);

  return brandImgs;
};

export default brandSlice.reducer;
