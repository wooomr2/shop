import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  userStats: [],
  total: 0,
  users: [],
  isLoading: false,
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/users/get`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUserStats = createAsyncThunk(
  "user/getUserStats",
  async (dummy, thunkAPI) => {
    try {
      const res = await axios.get(`/users/stats`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/users", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (form, thunkAPI) => {
    try {
      const res = await axios.patch("/users", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/users/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserStats.fulfilled]: (state, action) => {
      state.userStats = action.payload.userStats;
      state.isLoading = false;
    },
    [getUserStats.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.users = action.payload.users;
      state.isLoading = false;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addUser.pending]: (state) => {
      state.isLoading = true;
    },
    [addUser.fulfilled]: (state, action) => {
      state.users = [action.payload.user, ...state.users];
      state.isLoading = false;
    },
    [addUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      const { updatedUser } = action.payload;
      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      state.isLoading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user._id !== id);
      state.isLoading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
