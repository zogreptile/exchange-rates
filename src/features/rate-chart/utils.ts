import format from "date-fns/format";
import { RateDate, RateValue, Rates } from "../../api/exchange/models/rates";

type RatesChartDayData = { name: string } | { [currencyFrom: string]: number };

export function getRatesChartData(
  input: Rates,
  currencyFrom: string,
  currencyTo: string,
): RatesChartDayData[] {
  return Object.entries(input).map(
    ([date, rateObj]: [RateDate, RateValue]) => ({
      name: format(new Date(date), "dd.MM.yyyy"),
      [currencyFrom]: rateObj[currencyTo],
    }),
  );
}
