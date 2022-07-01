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
      const res = await axios.get("/brands");
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

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/brands", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (form, thunkAPI) => {
    try {
      const res = await axios.patch("/brands", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/brands/${id}`);
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

    [addBrand.pending]: (state) => {
      state.isLoading = true;
    },
    [addBrand.fulfilled]: (state, action) => {
      state.brands = [...state.brands, action.payload.brand];
      state.isLoading = false;
    },
    [addBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [updateBrand.pending]: (state) => {
      state.isLoading = true;
    },
    [updateBrand.fulfilled]: (state, action) => {
      const { updatedBrand } = action.payload;
      state.brands = state.brands.map((p) =>
        p._id === updatedBrand._id ? updatedBrand : p
      );
      state.isLoading = false;
    },
    [updateBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [deleteBrand.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBrand.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.brands = state.brands.filter((brand) => brand._id !== id);
      state.isLoading = false;
    },
    [deleteBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

// export const {} = brandSlice.actions;

export default brandSlice.reducer;
