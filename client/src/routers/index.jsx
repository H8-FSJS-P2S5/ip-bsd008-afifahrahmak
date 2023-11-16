import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import BaseLayout from "../layouts/BaseLayout";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
    ]
  },
])

export default router