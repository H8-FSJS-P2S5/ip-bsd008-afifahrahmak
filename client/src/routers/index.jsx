import { createBrowserRouter, redirect } from "react-router-dom";
import LoginForm from "../pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
]);

export default router;
