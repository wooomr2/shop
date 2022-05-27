import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { addCartItems, clearCart } from "./cartSlice";

const initialState = {
  // isAuthenticated:false,
  isLoading: false,
  error: null,
};

// thunkAPI.dispatch(openModal());
//  thunkAPI.rejectWithValue('something went wrong');
export const signin = createAsyncThunk(
  "auth/signin",
  async (_user,thunkAPI) => {
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
  reducers: {},
  extraReducers: {
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      // state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null
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
      state.error = null
    },
    [signout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
