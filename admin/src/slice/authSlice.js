import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  // isAuthenticated: false,
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
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(signout());
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// export const isUserLoggedIn = createAsyncThunk(
//   "auth/isUserLoggedIn",
//   async (thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const user = JSON.parse(localStorage.getItem("user"));

//         thunkAPI.dispatch(signin(user));
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

export const signout = createAsyncThunk("/auth/signout", async (thunkAPI) => {
  try {
    localStorage.clear();
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
      state.errorr = null;
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
      state.errorr = null;
    },
    [signout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
