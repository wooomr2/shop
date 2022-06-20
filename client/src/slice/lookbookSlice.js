import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  lookbooks: [],
  lookbook: {},
  total: 0,
  perPage: 20,
  _currentPage: 1,
  isLoading: false,
  error: null,
};

export const getLookbooks = createAsyncThunk(
  "lookbook/getLookbooks",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/lookbooks/get", payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getLookbook = createAsyncThunk(
  "lookbook/getLookbook",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/lookbooks/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const lookbookSlice = createSlice({
  name: "lookbook",
  initialState,
  reducers: {},
  extraReducers: {
    [getLookbooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getLookbooks.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.lookbooks = action.payload.lookbooks;
      state.isLoading = false;
    },
    [getLookbooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [getLookbook.pending]: (state) => {
      state.isLoading = true;
    },
    [getLookbook.fulfilled]: (state, action) => {
      state.lookbook = action.payload.lookbook;
      state.isLoading = false;
    },
    [getLookbook.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = lookbookSlice.actions;

export default lookbookSlice.reducer;
