import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  screen: null,
  isLoading: false,
};

export const getScreen = createAsyncThunk(
  "screen/getScreen",
  async (cid, thunkAPI) => {
    try {
      const res = await axios.get(`/screens/${cid}`);
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
    [getScreen.pending]: (state) => {
      state.isLoading = true;
    },
    [getScreen.fulfilled]: (state, action) => {
      state.screen = action.payload.screen;
      state.isLoading = false;
    },
    [getScreen.rejected]: (state, action) => {
      state.isLoading = false;
    },

  },
});

export const {} = screenSlice.actions;

export default screenSlice.reducer;
