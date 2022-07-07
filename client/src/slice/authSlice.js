import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { clearCart } from "./cartSlice";
import { getUser } from "./userSlice";

const initialState = {
  isAuthenticated: false,
  matchResult: "",
  matchPwd: false,
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

export const matchPassword = createAsyncThunk(
  "/auth/matchPassword",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/auth/check", user);
      console.log("res", res);
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
      thunkAPI.dispatch(clearCart());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (user, thunkAPI) => {
    try {
      console.log('user', user);
      await axios.post("/auth/update", user);

      thunkAPI.dispatch(getUser());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMatchResult: (state) => {
      state.matchResult = "";
    },
    clearMatchPassword: (state) => {
      state.matchPwd = false;
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

    [matchPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [matchPassword.fulfilled]: (state, action) => {
      state.matchPwd = action.payload.result;
      state.isLoading = false;
    },
    [matchPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
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

export const { clearMatchResult, clearError,clearMatchPassword } = authSlice.actions;

export default authSlice.reducer;
