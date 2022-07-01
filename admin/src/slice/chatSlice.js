import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alarm: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    increaseAlarm: (state, action) => {
      state.alarm = ++state.alarm;
    },
    clearAlarm: (state) => {
      state.alarm = 0;
    },
  },
});

export const { increaseAlarm, clearAlarm } = chatSlice.actions;

export default chatSlice.reducer;
