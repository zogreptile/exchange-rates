import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeNotification } from "./notifications.slice";

export function Notifications() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications);

  const deleteNotification = (itemId: number) => {
    dispatch(removeNotification(itemId));
  };

  if (!notifications.length) return null;

  return (
    <Snackbar
      open
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Stack
        sx={{
          width: "320px",
          flexDirection: "column",
        }}
      >
        {notifications.map((item) => (
          <Alert
            key={item.id}
            severity={item.type}
            onClick={() => deleteNotification(item.id)}
            variant="filled"
            sx={{
              width: "100%",
              boxSizing: "border-box",
              cursor: "pointer",
              "&:hover": {
                opacity: "0.9",
              },
              "&:not(:first-of-type)": {
                marginTop: "15px",
              },
            }}
          >
            {item.message}
          </Alert>
        ))}
      </Stack>
    </Snackbar>
  );
}
