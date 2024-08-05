import { createBrowserRouter } from "react-router-dom";
import { IndexPage, LoginPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
