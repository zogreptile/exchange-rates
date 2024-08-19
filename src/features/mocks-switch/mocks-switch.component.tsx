import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleMocks } from "./mocks-switch.slice";
import { RootState } from "../../store/types";

const mocksSelector = (state: RootState) => state.mocks;

export function MocksSwitch() {
  const dispatch = useAppDispatch();

  const { isEnabled } = useAppSelector(mocksSelector);

  function handleToggleMocks() {
    dispatch(toggleMocks());
  }

  const label = `Mocks ${isEnabled ? "enabled" : "disabled"}`;

  return (
    <FormControlLabel
      label={label}
      control={<Switch checked={isEnabled} onClick={handleToggleMocks} />}
    />
  );
}
