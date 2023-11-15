import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import BaseLayout from "../layouts/BaseLayout";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import PetDetails from "../pages/PetDetails";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/")
      }
      return null
    },
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/petDetails/:id",
        element: <PetDetails />
      },
    ]
  },
])

export default router