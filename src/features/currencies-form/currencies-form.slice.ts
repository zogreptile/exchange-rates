import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { exchangeApi } from "../../api/exchange/exchange-api";
import { RootState } from "../../store/types";
import { addNotification } from "../notifications";
import { incrementPreloaders, decrementPreloaders } from "../preloaders";

const SLICE_NAME = "currencies";

const initialState = {
  currencyFrom: "USD",
  currencyTo: "RUB",
  amountFrom: "1",
  amountTo: "",
  rate: 0,
};

export const fetchCurrentRate = createAsyncThunk(
  `${SLICE_NAME}/getCurrentRate`,
  async function (_, thunkApi) {
    try {
      thunkApi.dispatch(incrementPreloaders());
      const { currencies } = thunkApi.getState() as RootState;

      return await exchangeApi.getCurrentRate(
        currencies.currencyFrom,
        currencies.currencyTo,
        Number(currencies.amountFrom),
      );
    } catch (error) {
      thunkApi.dispatch(addNotification({ message: `${error}` }));
      return thunkApi.rejectWithValue(error);
    } finally {
      thunkApi.dispatch(decrementPreloaders());
    }
  },
);

export const currenciesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrencyFrom: (state, action: PayloadAction<string>) => {
      state.currencyFrom = action.payload;
    },
    setCurrencyTo: (state, action: PayloadAction<string>) => {
      state.currencyTo = action.payload;
    },
    setAmountFrom: (state, action: PayloadAction<string>) => {
      state.amountFrom = action.payload;
    },
    setAmountTo: (state, action: PayloadAction<string>) => {
      state.amountTo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentRate.fulfilled, (state, action) => {
      state.rate = action.payload.rate;
      state.amountTo = action.payload.result.toString();
    });
  },
});

export const { setCurrencyFrom, setCurrencyTo, setAmountFrom, setAmountTo } =
  currenciesSlice.actions;

export const currenciesReducer = currenciesSlice.reducer;
