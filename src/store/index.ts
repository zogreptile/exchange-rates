import { configureStore } from '@reduxjs/toolkit';
import { currenciesReducer } from '../features/currencies-form/currencies-form.slice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});
