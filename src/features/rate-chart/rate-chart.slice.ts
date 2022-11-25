import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import sub from 'date-fns/sub';
import format from 'date-fns/format';

import { exchangeApi } from '../../api/exchange/exchange-api';
import { Rates } from '../../api/exchange/models/rates';
import { RootState } from '../../store/types';
import { addNotification } from '../notifications/notifications.slice';
import { incrementPreloaders, decrementPreloaders } from '../preloaders/preloaders.slice';

const SLICE_NAME = 'rates';

type StringifiedDateObject = string;

export interface RatesState {
  dateFrom: StringifiedDateObject;
  dateTo: StringifiedDateObject;
  rates: Rates,
};

const initialState: RatesState = {
  dateFrom: sub(new Date(), { months: 1 }).toString(),
  dateTo: new Date().toString(),
  rates: {},
};

export const fetchRates = createAsyncThunk(
  `${SLICE_NAME}/getRates`,
  async function (_, thunkApi) {
    try {
      thunkApi.dispatch(incrementPreloaders());
      const { currencies, rates } = thunkApi.getState() as RootState;

      return await exchangeApi.getRates(
        currencies.currencyFrom,
        currencies.currencyTo,
        format(new Date(rates.dateFrom), 'yyyy-MM-dd'),
        format(new Date(rates.dateTo), 'yyyy-MM-dd'),
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
  reducers: {
    setDateFrom: (state, action: PayloadAction<StringifiedDateObject>) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action: PayloadAction<StringifiedDateObject>) => {
      state.dateTo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
      });
  }
});

export const {
  setDateFrom,
  setDateTo,
} = ratesSlice.actions;

export const ratesReducer = ratesSlice.reducer;
