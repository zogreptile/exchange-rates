import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import sub from "date-fns/sub";

const SLICE_NAME = "interval";

type StringifiedDateObject = string;

const initialState = {
  dateFrom: sub(new Date(), { months: 1 }).toString(),
  dateTo: new Date().toString(),
};

export const intervalSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setDateFrom: (state, action: PayloadAction<StringifiedDateObject>) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action: PayloadAction<StringifiedDateObject>) => {
      state.dateTo = action.payload;
    },
  },
});

export const { setDateFrom, setDateTo } = intervalSlice.actions;

export const intervalReducer = intervalSlice.reducer;
