import TextField from "@mui/material/TextField";
import { Layout } from "../common/layout";
import { noop } from "../common/utils";

export function LoginPage() {
  return (
    <Layout>
      <TextField
        label="API key"
        helperText="Type in TEST to enable mocks"
        id="from-amount"
        variant="outlined"
        size="small"
        // value={amountFrom}
        onChange={noop}
      />
    </Layout>
  );
}
