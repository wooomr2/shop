import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { clearCart } from "./cartSlice";
import { getUser } from "./userSlice";

const initialState = {
  isAuthenticated: false,
  matchPwd: false,
  msg: "",
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
      const res = await axios.post("/auth/pwcheck", user);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (user, thunkAPI) => {
    try {
      await axios.post("/auth/update", user);

      thunkAPI.dispatch(getUser());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "/auth/signup",
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

export const kakao = createAsyncThunk("auth/kakao", async (code, thunkAPI) => {
  try {
    const res = await axios.get(`/auth/kakao/?code=${code}`);

    const { accessToken, user, kakaoToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("kakaoToken", kakaoToken);

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const signout = createAsyncThunk(
  "/auth/signout",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get("/auth/signout");
      const kakaoToken = localStorage.getItem("kakaoToken");

      if (res.status === 204) {
        localStorage.clear();
        thunkAPI.dispatch(clearCart());

        if (kakaoToken) {
          await fetch(`https://kapi.kakao.com/v1/user/unlink`, {
            method: "POST",

            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${kakaoToken}`,
            },
          });
        }
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/auth/forgot_password",
  async (email, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/forgot_password`, { email });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/auth/reset_password",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`/auth/reset_password`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.msg = "";
      state.error= null;
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
      state.msg = action.payload.msg;
      state.isLoading = false;
    },
    [matchEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
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

    [updateProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.matchPwd = false;
      state.isLoading = false;
    },
    [updateProfile.rejected]: (state, action) => {
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

    [kakao.pending]: (state) => {
      state.isLoading = true;
    },
    [kakao.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    [kakao.rejected]: (state, action) => {
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

    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.msg = action.payload.msg;
      state.isLoading = false;
      state.error = null;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.msg = action.payload.msg;
      state.isLoading = false;
      state.error = null;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { clearState, clearError } = authSlice.actions;

export default authSlice.reducer;
