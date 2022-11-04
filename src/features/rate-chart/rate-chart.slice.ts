import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import sub from 'date-fns/sub';
import format from 'date-fns/format';

import { exchangeApi } from '../../api/exchange';
import { Rates } from '../../api/exchange/models/rates';
import { RootState } from '../../store/types';
import { addNotification } from '../notifications/notifications.slice';

const SLICE_NAME = 'rates';

type StringifiedDateObject = string;

export interface RatesState {
  dateFrom: StringifiedDateObject;
  dateTo: StringifiedDateObject;
  rates: Rates,
  isFetching: boolean;
};

const initialState: RatesState = {
  dateFrom: sub(new Date(), { months: 1 }).toString(),
  dateTo: new Date().toString(),
  rates: {},
  isFetching: false,
};

export const fetchRates = createAsyncThunk(
  `${SLICE_NAME}/getRates`,
  async function (_, thunkApi) {
    try {
      const { currencies, rates } = thunkApi.getState() as RootState;

      return await exchangeApi.getRates(
        currencies.currencyFrom,
        currencies.currencyTo,
        format(new Date(rates.dateFrom), 'yyyy-MM-dd'),
        format(new Date(rates.dateTo), 'yyyy-MM-dd'),
      );
    } catch (error) {
      thunkApi.dispatch(addNotification({
        id: Date.now(),
        message: `${error}`,
        type: 'error',
      }));
      return thunkApi.rejectWithValue(error);
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
      .addCase(fetchRates.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.isFetching = false;
        state.rates = action.payload.rates;
      });
  }
});

export const {
  setDateFrom,
  setDateTo,
} = ratesSlice.actions;

export const ratesReducer = ratesSlice.reducer;
