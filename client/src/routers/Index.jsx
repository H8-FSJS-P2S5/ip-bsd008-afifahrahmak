import { createBrowserRouter, redirect } from "react-router-dom";
import Parent from "../views/Parent";
import Home from "../views/Home";
import RecipesAdd from "../views/RecipesAdd";
import Login from "../views/Login";
import CompleteProfile from "../views/CompleteProfile";
import RecipesDetail from "../views/RecipesDetail";
const BASE_URL = "https://server.andrewdh.tech"

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => redirect("/login")
    },
    {
        path: "/login",
        element: <Login url={BASE_URL} />
    },
    {
        path: "/complete-profile",
        element: <CompleteProfile url={BASE_URL} />
    },
    { 
        path: "/recipes", 
        element: <Parent url={BASE_URL} />,
        children: [
            { path: "", element: <Home url={BASE_URL} /> },
            { path: "add", element: <RecipesAdd url={BASE_URL} /> },
            { path: ":id", element: <RecipesDetail url={BASE_URL} /> },
        ]
    }
])

export default router;