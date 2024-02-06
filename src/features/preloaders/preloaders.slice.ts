import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "preloaders";

export const preloadersSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    count: 0,
  },
  reducers: {
    incrementPreloaders: (state) => {
      state.count += 1;
    },
    decrementPreloaders: (state) => {
      if (state.count === 0) return;
      state.count -= 1;
    },
  },
});

export const { incrementPreloaders, decrementPreloaders } =
  preloadersSlice.actions;

export const preloadersReducer = preloadersSlice.reducer;
