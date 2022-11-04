import { configureStore } from '@reduxjs/toolkit';
import { currenciesReducer } from '../features/currencies-form/currencies-form.slice';
import { ratesReducer } from '../features/rate-chart/rate-chart.slice';
import { notificationsReducer } from '../features/notifications/notifications.slice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    rates: ratesReducer,
    notifications: notificationsReducer,
  },
});
