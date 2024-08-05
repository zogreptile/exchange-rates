import { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { MocksSwitch } from "../features/mocks-switch";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppBar component="nav" position="sticky" color="transparent">
        <Toolbar component={Container} maxWidth="md">
          <div style={{ marginLeft: "auto" }}>
            <MocksSwitch />
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ paddingTop: "30px" }}>
        {children}
      </Container>
    </>
  );
}
