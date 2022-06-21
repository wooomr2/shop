import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  reviews: [],
  review: {},
  isLoading:false,
};

export const getReviews = createAsyncThunk(
  "product/getReviews",
  async (pid, thunkAPI) => {
    try {
      const res = await axios.get(`/reviews/${pid}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const upsertReview = createAsyncThunk(
  "product/upsertReview",
  async (review, thunkAPI) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios.patch(`/reviews`, { user, review });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    [getReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [getReviews.fulfilled]: (state, action) => {
      const {productReview} = action.payload;
      const reviews = productReview ? productReview.reviews : []
      state.reviews = reviews;
      state.isLoading = false;
    },
    [getReviews.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [upsertReview.pending]: (state) => {
      state.isLoading = true;
    },
    [upsertReview.fulfilled]: (state, action) => {
      const {productReview} = action.payload;
      const reviews = productReview ? productReview.reviews : []
      state.reviews = reviews;
      state.isLoading = false;
    },
    [upsertReview.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
