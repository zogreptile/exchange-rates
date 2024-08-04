import Container from "@mui/material/Container";
import { CurrenciesForm } from "../features/currencies-form";
import { IntervalForm } from "../features/interval-form";
import { RateChart } from "../features/rate-chart";

export function IndexPage() {
  return (
    <Container sx={{ paddingTop: "30px" }}>
      <CurrenciesForm />
      <IntervalForm />
      <RateChart />
    </Container>
  );
}
