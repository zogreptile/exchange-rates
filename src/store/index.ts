import { configureStore } from "@reduxjs/toolkit";
import { currenciesReducer } from "../features/currencies-form";
import { intervalReducer } from "../features/interval-form";
import { ratesReducer } from "../features/rate-chart";
import { notificationsReducer } from "../features/notifications";
import { preloadersReducer } from "../features/preloaders";
import { mocksSwitchReducer } from "../features/mocks-switch";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    interval: intervalReducer,
    rates: ratesReducer,
    notifications: notificationsReducer,
    preloaders: preloadersReducer,
    mocks: mocksSwitchReducer,
  },
});
