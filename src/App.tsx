import { RouterProvider } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";

import { Notifications } from "./features/notifications";
import { Preloader } from "./features/preloaders";

import { theme } from "./common/css-theme";
import { router } from "./router";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={router} />

        <Notifications />
        <Preloader />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
