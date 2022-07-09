import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  lookbooks: [],
  lookbook: {},
  relatedProducts: [],
  isLoading: false,
  error: null,
};

export const getLookbooks = createAsyncThunk(
  "lookbook/getLookbooks",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get("/lookbooks");
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

export const addLookbook = createAsyncThunk(
  "lookbook/addLookbook",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/lookbooks", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateLookbook = createAsyncThunk(
  "lookbook/updateLookbook",
  async (form, thunkAPI) => {
    try {
      const res = await axios.patch("/lookbooks", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const deleteLookbook = createAsyncThunk(
  "lookbook/deleteLookbook",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/lookbooks/${id}`);
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
      state.relatedProducts = action.payload.relatedProducts;
      state.isLoading = false;
    },
    [getLookbook.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addLookbook.pending]: (state) => {
      state.isLoading = true;
    },
    [addLookbook.fulfilled]: (state, action) => {
      state.lookbooks = [action.payload.lookbook, ...state.lookbooks];
      state.isLoading = false;
    },
    [addLookbook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [updateLookbook.pending]: (state) => {
      state.isLoading = true;
    },
    [updateLookbook.fulfilled]: (state, action) => {
      const { updatedLookbook } = action.payload;
      state.lookbooks = state.lookbooks.map((p) =>
        p._id === updatedLookbook._id ? updatedLookbook : p
      );
      state.isLoading = false;
    },
    [updateLookbook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [deleteLookbook.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteLookbook.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.lookbooks = state.lookbooks.filter((lookbook) => lookbook._id !== id);
      state.isLoading = false;
    },
    [deleteLookbook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

// export const {} = lookbookSlice.actions;

export default lookbookSlice.reducer;
