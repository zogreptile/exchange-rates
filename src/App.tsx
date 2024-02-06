import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";

import { CurrenciesForm } from "./features/currencies-form/currencies-form.component";
import { RateChart } from "./features/rate-chart/rate-chart.component";
import { Notifications } from "./features/notifications/notifications.component";
import { Preloader } from "./features/preloaders/preloaders.component";

import { theme } from "./common/css-theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container sx={{ paddingTop: "30px" }}>
          <CurrenciesForm />
          <RateChart />
        </Container>

        <Notifications />
      </LocalizationProvider>

      <Preloader />
    </ThemeProvider>
  );
}
