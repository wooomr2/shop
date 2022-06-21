import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { clearCart } from "./cartSlice";

const initialState = {
  isAuthenticated: false,
  matchResult: "",
  isLoading: false,
  error: null,
};

export const matchEmail = createAsyncThunk(
  "/auth/matchEmail",
  async (email, thunkAPI) => {
    try {
      const res = await axios.get(`/auth/${email}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "/user/signup",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/signup`, user);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (_user, thunkAPI) => {
    try {
      const res = await axios.post("/auth/signin", _user);

      const { accessToken, user } = res.data;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));

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
      
      sessionStorage.clear();
      thunkAPI.dispatch(clearCart());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMatchResult: (state) => {
      state.matchResult = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [matchEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [matchEmail.fulfilled]: (state, action) => {
      state.matchResult = action.payload.msg;
      state.isLoading = false;
    },
    [matchEmail.rejected]: (state) => {
      state.isLoading = false;
    },

    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    [signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [signout.pending]: (state) => {
      state.isLoading = true;
    },
    [signout.fulfilled]: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    [signout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { clearMatchResult, clearError } = authSlice.actions;

export default authSlice.reducer;
