import { Layout } from "../common/layout";
import { CurrenciesForm } from "../features/currencies-form";
import { IntervalForm } from "../features/interval-form";
import { RateChart } from "../features/rate-chart";

export function MainPage() {
  return (
    <Layout>
      <CurrenciesForm />
      <IntervalForm />
      <RateChart />
    </Layout>
  );
}
