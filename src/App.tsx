import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";

import { Notifications } from "./features/notifications";
import { Preloader } from "./features/preloaders";
import { IndexPage } from "./pages/index-page";

import { theme } from "./common/css-theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <IndexPage />

        <Notifications />
        <Preloader />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
