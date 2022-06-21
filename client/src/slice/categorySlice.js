import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  categories: [],
  linearCategories: [],
  isLoading: false,
  categoryOpen: false,
};

export const createLinearCategory = (categories, linearCategories = []) => {
  for (let category of categories) {
    linearCategories.push(category);
    if (category.children.length > 0)
      createLinearCategory(category.children, linearCategories);
  }
  return linearCategories;
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/categories");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearToggle: (state) => {
      state.categoryOpen = false;
    },
    categoryToggle: (state) => {
      state.categoryOpen = !state.categoryOpen;
    },
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.linearCategories = createLinearCategory(action.payload);
      state.isLoading = false;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setCurrentStatus, categoryToggle, clearToggle } = categorySlice.actions;

export default categorySlice.reducer;
