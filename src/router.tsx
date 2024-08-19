import { createBrowserRouter } from "react-router-dom";
import { MainPage, LoginPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
