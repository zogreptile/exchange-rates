import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Container from '@mui/material/Container';
import { LocalizationProvider } from "@mui/x-date-pickers";

import { CurrenciesForm } from './features/currencies-form';
import { RateChart } from './features/rate-chart';
import { Notifications } from './features/notifications';
import { Preloader } from './features/preloaders';

export function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container sx={{ paddingTop: '30px' }}>
          <CurrenciesForm />
          <RateChart />
        </Container>

        <Notifications />
      </LocalizationProvider>

      <Preloader />
    </>
  );
}
