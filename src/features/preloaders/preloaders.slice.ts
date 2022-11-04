import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'preloaders';

const PRELOADER_ITEM = null;

const initialState: typeof PRELOADER_ITEM[] = [];

export const preloadersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    incrementPreloaderList: (state) => {
      state.push(PRELOADER_ITEM);
    },
    decrementPreloaderList: (state) => {
      state.pop();
    },
  },
});

export const {
  incrementPreloaderList,
  decrementPreloaderList,
} = preloadersSlice.actions;

export const preloadersReducer = preloadersSlice.reducer;
