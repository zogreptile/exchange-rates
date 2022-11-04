import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SLICE_NAME = 'notifications';

export interface INotificationItem {
  id: number;
  message: string;
  type: AlertColor;
}

const initialState: INotificationItem[] = [];

export const notificationsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotificationItem>) => {
      state.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      const removeIndex = state.findIndex(item => item.id === action.payload);
      if (removeIndex !== -1) state.splice(removeIndex, 1);
    },
  },
});

export const {
  addNotification,
  removeNotification,
} = notificationsSlice.actions;

export const notificationsReducer = notificationsSlice.reducer;
