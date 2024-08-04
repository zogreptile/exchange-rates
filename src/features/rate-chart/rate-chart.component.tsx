import styled from "@emotion/styled";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAppSelector } from "../../store/hooks";
import { prepareRatesChartData } from "./rate-chart.utils";
import { useFetchRates } from "./rate-chart.hooks";

const ChartContainer = styled.div`
  height: 400px;
  position: relative;
`;

const RateValue = styled.div`
  position: absolute;
  bottom: 70px;
  left: 100px;
  font-size: 70px;
  font-weight: bold;
  z-index: -1;
`;

export function RateChart() {
  useFetchRates();

  const { rates } = useAppSelector((state) => state.rates);
  const { currencyFrom, currencyTo, rate } = useAppSelector(
    (state) => state.currencies,
  );

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={prepareRatesChartData(rates, currencyFrom, currencyTo)}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis width={30} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={currencyFrom}
            stroke="#8884d8"
            fill="#8884d8"
          ></Area>
        </AreaChart>
      </ResponsiveContainer>

      <RateValue>{rate}</RateValue>
    </ChartContainer>
  );
}
