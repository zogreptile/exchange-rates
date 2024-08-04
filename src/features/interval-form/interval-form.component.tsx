import styled from "@emotion/styled";
import sub from "date-fns/sub";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDateFrom, setDateTo } from "./interval-form.slice";

const DatePickersWrapper = styled.div`
  margin-bottom: 20px;
`;

export function IntervalForm() {
  const dispatch = useAppDispatch();

  const { dateFrom, dateTo } = useAppSelector((state) => state.interval);

  const changeDateFrom = (value: Date | null) => {
    if (!value) return;
    dispatch(setDateFrom(value.toString()));
  };

  const changeDateTo = (value: Date | null) => {
    if (!value) return;
    dispatch(setDateTo(value.toString()));
  };

  return (
    <DatePickersWrapper>
      <DatePicker
        label="From"
        value={dateFrom}
        onChange={changeDateFrom}
        inputFormat="dd.MM.yyyy"
        minDate={sub(new Date(), { days: 365 })}
        renderInput={(params) => (
          <TextField size="small" sx={{ width: "230px" }} {...params} />
        )}
      />

      <DatePicker
        label="To"
        value={dateTo}
        onChange={changeDateTo}
        inputFormat="dd.MM.yyyy"
        maxDate={new Date()}
        renderInput={(params) => (
          <TextField size="small" sx={{ width: "230px" }} {...params} />
        )}
      />
    </DatePickersWrapper>
  );
}
