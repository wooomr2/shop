import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  total: 0,
  reviews: [],
  review: {},
  isLoading: false,
};

export const getReviewsByProductId = createAsyncThunk(
  "product/getReviewsByProductId",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/reviews/getByProductId`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getReviewsByUserId = createAsyncThunk(
  "product/getReviewsByUserId",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/reviews/get`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getReview = createAsyncThunk(
  "product/getReview",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/reviews/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const upsertReview = createAsyncThunk(
  "product/addReview",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post(`/reviews`, form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/reviews/${id}`);
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
    [getReviewsByProductId.pending]: (state) => {
      state.isLoading = true;
    },
    [getReviewsByProductId.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.reviews = action.payload.reviews;
      state.isLoading = false;
    },
    [getReviewsByProductId.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getReviewsByUserId.pending]: (state) => {
      state.isLoading = true;
    },
    [getReviewsByUserId.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.reviews = action.payload.reviews;
      state.isLoading = false;
    },
    [getReviewsByUserId.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getReview.pending]: (state) => {
      state.isLoading = true;
    },
    [getReview.fulfilled]: (state, action) => {
      state.review = action.payload.review;
      state.isLoading = false;
    },
    [getReview.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [upsertReview.pending]: (state) => {
      state.isLoading = true;
    },
    [upsertReview.fulfilled]: (state, action) => {
      state.isLoading = false;
      const result = window.confirm(
        "등록 완료. 리뷰페이지로 이동하시겠습니까?"
      );
      if (result) window.location.href = "/mypage/reviews";
    },
    [upsertReview.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteReview.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteReview.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteReview.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
