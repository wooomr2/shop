import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  screens: [],
  isLoading: false,
  error: null,
};

export const getScreens = createAsyncThunk(
  "screen/getScreens",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/screens");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addScreen = createAsyncThunk(
  "screen/addScreen",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/screens", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteScreen = createAsyncThunk(
  "screen/deleteScreen",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/screens/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {},
  extraReducers: {
    [getScreens.pending]: (state) => {
      state.isLoading = true;
    },
    [getScreens.fulfilled]: (state, action) => {
      state.screens = action.payload.screens;
      state.isLoading = false;
    },
    [getScreens.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [addScreen.pending]: (state) => {
      state.isLoading = true;
    },
    [addScreen.fulfilled]: (state, action) => {
      state.screens = [...state.screens, action.payload.screen];
      state.isLoading = false;
    },
    [addScreen.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [deleteScreen.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteScreen.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.screens = state.screens.filter((screen) => screen._id !== id);
      state.isLoading = false;
    },
    [deleteScreen.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {} = screenSlice.actions;

export default screenSlice.reducer;
