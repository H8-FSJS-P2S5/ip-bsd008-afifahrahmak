import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/home";
import FormPost from "../pages/FormPost";
import RegisterForm from "../pages/FormRegister";
import FormEditPost from "../pages/FormEdit";
import LoginForm from "../pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      lov;
      if (access_token) {
        redirect("/Home");
      }
      return null;
    },
  },
  {
    path: "/Register",
    element: <RegisterForm />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        redirect("/Home");
      }
      return null;
    },
  },
  {
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        redirect("/");
      }
      return null;
    },
  },
  {
    path: "/Home",
    element: <HomePage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        redirect("/");
      }
      return null;
    },
  },
  {
    path: "/Add-Post",
    element: <FormPost />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        redirect("/");
      }
      return null;
    },
  },
  {
    path: "/Edit-Post/:postId",
    element: <FormEditPost />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        redirect("/");
      }
      return null;
    },
  },
]);

export default router;
