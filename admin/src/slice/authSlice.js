import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// thunkAPI.getState()
// thunkAPI.dispatch(openModal());
//  thunkAPI.rejectWithValue('something went wrong');
export const signin = createAsyncThunk(
  "auth/signin",
  async (_user, thunkAPI) => {
    try {
      const res = await axios.post("/auth/admin/signin", _user);

      const { accessToken, user } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  "/auth/signout",
  async (dummy, thunkAPI) => {
    try {
      await axios.get("/auth/signout");
      localStorage.clear();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.errorr = null;
    },
    [signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [signout.pending]: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    [signout.fulfilled]: (state) => {
      state.isLoading = false;
      state.errorr = null;
    },
    [signout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
