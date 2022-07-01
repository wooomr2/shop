import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  collections: [],
  collection: {},
  isLoading: false,
  error: null,
};

export const getCollections = createAsyncThunk(
  "collection/getCollections",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get("/collections");
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

export const addCollection = createAsyncThunk(
  "collection/addCollection",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/collections", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async (form, thunkAPI) => {
    try {
      const res = await axios.patch("/collections", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/collections/${id}`);
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
      state.collections = action.payload.collections;
      state.isLoading = false;
    },
    [getCollections.rejected]: (state, action) => {
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

    [addCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [addCollection.fulfilled]: (state, action) => {
      state.collections = [...state.collections, action.payload.collection];
      state.isLoading = false;
    },
    [addCollection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [updateCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCollection.fulfilled]: (state, action) => {
      const { updatedCollection } = action.payload;
      state.collections = state.collections.map((p) =>
        p._id === updatedCollection._id ? updatedCollection : p
      );
      state.isLoading = false;
    },
    [updateCollection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [deleteCollection.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCollection.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.collections = state.collections.filter(
        (collection) => collection._id !== id
      );
      state.isLoading = false;
    },
    [deleteCollection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

// export const {} = collectionSlice.actions;

export default collectionSlice.reducer;
