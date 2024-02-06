import { configureStore } from "@reduxjs/toolkit";
import { currenciesReducer } from "../features/currencies-form/currencies-form.slice";
import { ratesReducer } from "../features/rate-chart/rate-chart.slice";
import { notificationsReducer } from "../features/notifications/notifications.slice";
import { preloadersReducer } from "../features/preloaders/preloaders.slice";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    rates: ratesReducer,
    notifications: notificationsReducer,
    preloaders: preloadersReducer,
  },
});
