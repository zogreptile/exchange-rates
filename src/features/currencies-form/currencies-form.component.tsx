import styled from "@emotion/styled";

import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { isStringifiedNumber, noop } from "../../common/utils";
import { useDebouncedEffect } from "../../common/hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setCurrencyFrom,
  setCurrencyTo,
  setAmountFrom,
  setAmountTo,
  fetchCurrentRate,
} from "./currencies-form.slice";

interface ISelectOption {
  value: string;
  label: string;
}

const currenciesOptions: ISelectOption[] = [
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "RUB", label: "Ruble" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "CNY", label: "Chinese Yuan" },
  { value: "BTC", label: "Bitcoin" },
];

const FieldsWrapper = styled.div`
  width: 460px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60px;
`;

export function CurrenciesForm() {
  const dispatch = useAppDispatch();
  const { currencyFrom, currencyTo, amountFrom, amountTo } = useAppSelector(
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

  const handleChangeCurrencyFrom = (event: SelectChangeEvent) => {
    dispatch(setCurrencyFrom(event.target.value));
  };

  const handleChangeCurrencyTo = (event: SelectChangeEvent) => {
    dispatch(setCurrencyTo(event.target.value));
  };

  const handleChangeCurrencyAmountFrom = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (!isStringifiedNumber(event.target.value)) return;
    if (!event.target.value) dispatch(setAmountTo(""));

    dispatch(setAmountFrom(event.target.value));
  };

  return (
    <FieldsWrapper>
      <TextField
        id="from-amount"
        variant="outlined"
        size="small"
        value={amountFrom}
        onChange={handleChangeCurrencyAmountFrom}
        sx={{ width: "50%" }}
      />

      <Select
        id="from-currency"
        value={currencyFrom}
        size="small"
        onChange={handleChangeCurrencyFrom}
        sx={{ width: "50%" }}
      >
        {currenciesOptions
          .filter(({ value }) => value !== currencyTo)
          .map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </Select>

      <TextField
        id="to-amount"
        variant="outlined"
        size="small"
        value={amountTo}
        onChange={noop}
        sx={{
          width: "50%",
          pointerEvents: "none",
        }}
      />

      <Select
        id="to-currency"
        value={currencyTo}
        size="small"
        onChange={handleChangeCurrencyTo}
        sx={{ width: "50%" }}
      >
        {currenciesOptions
          .filter(({ value }) => value !== currencyFrom)
          .map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
    </FieldsWrapper>
  );
}
