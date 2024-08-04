import { useDebouncedEffect } from "../../common/hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCurrentRate } from "./currencies-form.slice";

export function useFetchCurrentRate() {
  const dispatch = useAppDispatch();
  const { currencyFrom, currencyTo, amountFrom } = useAppSelector(
    (state) => state.currencies,
  );

  const getCurrentRate = () => {
    if (!currencyFrom || !currencyTo || !amountFrom) return;
    dispatch(fetchCurrentRate());
  };

  useDebouncedEffect(
    getCurrentRate,
    [currencyFrom, currencyTo, amountFrom, dispatch],
    500,
  );
}
