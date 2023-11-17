import { createBrowserRouter, redirect } from "react-router-dom";
import Add from "../views/add";
import Chat from "../views/chat";
import Home from "../views/home";
import Login from "../views/login";
import MyAdvice from "../views/myAdvice";
import Parent from "../views/parent";
import Quote from "../views/quotes";
import Read from "../views/read";
import Register from "../views/register";
import Update from "../views/update";
const router = createBrowserRouter([
  {
    element: <Parent />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/advice/:id",
        element: <Read />,
      },
      {
        path: "/addAdvice",
        element: <Add />,
      },
      {
        path: "/myAdvice",
        element: <MyAdvice />,
      },
      {
        path: "/updateAdvice/:id",
        element: <Update />,
      },
      {
        path: "/quotes",
        element: <Quote />,
      },
    ],
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/",
    element: <Login />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
]);

export default router;
