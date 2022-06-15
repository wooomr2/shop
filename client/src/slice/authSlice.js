import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { addCartItems, clearCart } from "./cartSlice";

const initialState = {
  // isAuthenticated:false,
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

// thunkAPI.dispatch(openModal());
//  thunkAPI.rejectWithValue('something went wrong');
export const signin = createAsyncThunk(
  "auth/signin",
  async (_user, thunkAPI) => {
    try {
      const res = await axios.post("/auth/signin", _user);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
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

export const signout = createAsyncThunk("auth/signout", (thunk, thunkAPI) => {
  try {
    localStorage.clear();
    // const res = await axios.get("/auth/signout");
    thunkAPI.dispatch(clearCart());
    // return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMatchResult: (state) => {
      state.matchResult = "";
    },
  },
  extraReducers: {
    // auth/matchEmail
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
    // auth/signup
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
      // state.isAuthenticated = true;
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
      // state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    [signout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { clearMatchResult } = authSlice.actions;

export default authSlice.reducer;
