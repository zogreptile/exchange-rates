import { useEffect } from "react";
import styled from "@emotion/styled";
import sub from "date-fns/sub";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField, { } from "@mui/material/TextField";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setDateFrom, setDateTo, fetchRates } from './rate-chart.slice';
import { getRatesChartData } from './utils';

const DatePickersWrapper = styled.div`
  margin-bottom: 20px;
`;

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
  const dispatch = useAppDispatch();
  const { currencyFrom, currencyTo, rate } = useAppSelector((state) => state.currencies);
  const { dateFrom, dateTo, rates } = useAppSelector((state) => state.rates);

  const getRates = () => {
    if (!currencyFrom || !currencyTo || !dateFrom || !dateTo) return;
    dispatch(fetchRates());
  }

  useEffect(getRates, [currencyFrom, currencyTo, dateFrom, dateTo, dispatch]);

  const changeDateFrom = (value: Date | null) => {
    if (!value) return;
    dispatch(setDateFrom(value.toString()));
  }

  const changeDateTo = (value: Date | null) => {
    if (!value) return;
    dispatch(setDateTo(value.toString()));
  }

  return (
    <>
      <DatePickersWrapper>
        <DatePicker
          label="From"
          value={dateFrom}
          onChange={changeDateFrom}
          inputFormat='dd.MM.yyyy'
          minDate={sub(new Date(), { days: 365 })}
          renderInput={(params) => (
            <TextField
              size='small'
              sx={{ width: '230px' }}
              {...params}
            />
          )}
        />

        <DatePicker
          label="To"
          value={dateTo}
          onChange={changeDateTo}
          inputFormat='dd.MM.yyyy'
          maxDate={new Date()}
          renderInput={(params) => (
            <TextField
              size='small'
              sx={{ width: '230px' }}
              {...params}
            />
          )}
        />
      </DatePickersWrapper>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={getRatesChartData(rates, currencyFrom, currencyTo)}
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

        <RateValue>{ rate }</RateValue>
      </ChartContainer>
    </>
  )
}
