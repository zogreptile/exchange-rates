import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../services";

const MOCKS_SWITCH_STORAGE_KEY = "are_mocks_enabled";

const SLICE_NAME = "mocksSwitch";

const initialState = {
  isEnabled: storage.getItem<boolean>(MOCKS_SWITCH_STORAGE_KEY, true),
};

export const mocksSwitchSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleMocks: (state) => {
      const newValue = !state.isEnabled;

      state.isEnabled = newValue;
      storage.setItem<boolean>(MOCKS_SWITCH_STORAGE_KEY, newValue);
    },
  },
});

export const { toggleMocks } = mocksSwitchSlice.actions;

export const mocksSwitchReducer = mocksSwitchSlice.reducer;
