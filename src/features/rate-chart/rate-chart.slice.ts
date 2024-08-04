import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import format from "date-fns/format";

import { exchangeApi } from "../../api/exchange/exchange-api";
import { Rates } from "../../api/exchange/models/rates";
import { RootState } from "../../store/types";
import { addNotification } from "../notifications";
import { incrementPreloaders, decrementPreloaders } from "../preloaders";

const SLICE_NAME = "rates";

interface RatesState {
  rates: Rates;
}

const initialState: RatesState = {
  rates: {},
};

export const fetchRates = createAsyncThunk(
  `${SLICE_NAME}/getRates`,
  async function (_, thunkApi) {
    try {
      thunkApi.dispatch(incrementPreloaders());
      const { currencies, interval } = thunkApi.getState() as RootState;

      return await exchangeApi.getRates(
        currencies.currencyFrom,
        currencies.currencyTo,
        format(new Date(interval.dateFrom), "yyyy-MM-dd"),
        format(new Date(interval.dateTo), "yyyy-MM-dd"),
      );
    } catch (error) {
      thunkApi.dispatch(addNotification({ message: `${error}` }));
      return thunkApi.rejectWithValue(error);
    } finally {
      thunkApi.dispatch(decrementPreloaders());
    }
  },
);

export const ratesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.rates = action.payload.rates;
    });
  },
});

export const ratesReducer = ratesSlice.reducer;
