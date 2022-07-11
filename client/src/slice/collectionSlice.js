import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  total: 0,
  collections: [],
  collection: {},
  isLoading: false,
  error: null,
};

export const getCollections = createAsyncThunk(
  "collection/getCollections",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/collections/get", payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getNewCollections = createAsyncThunk(
  "collection/getNewCollections",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/collections/new");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getCollection = createAsyncThunk(
  "collection/getCollection",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/collections/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: {
    [getCollections.pending]: (state) => {
      state.isLoading = true;
    },
    [getCollections.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.collections = action.payload.collections;
      state.isLoading = false;
    },
    [getCollections.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [getNewCollections.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewCollections.fulfilled]: (state, action) => {
      state.collections = action.payload.collections;
      state.isLoading = false;
    },
    [getNewCollections.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [getCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [getCollection.fulfilled]: (state, action) => {
      state.collection = action.payload.collection;
      state.isLoading = false;
    },
    [getCollection.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const {} = collectionSlice.actions;

export default collectionSlice.reducer;
