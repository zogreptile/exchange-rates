import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRates } from "./rate-chart.slice";

export function useFetchRates() {
  const dispatch = useAppDispatch();

  const { dateFrom, dateTo } = useAppSelector((state) => state.interval);
  const { currencyFrom, currencyTo } = useAppSelector(
    (state) => state.currencies,
  );

  const getRates = () => {
    if (!currencyFrom || !currencyTo || !dateFrom || !dateTo) return;
    dispatch(fetchRates());
  };

  useEffect(getRates, [currencyFrom, currencyTo, dateFrom, dateTo, dispatch]);
}
