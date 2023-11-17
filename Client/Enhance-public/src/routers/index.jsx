import {
    createBrowserRouter, redirect,
  } from "react-router-dom";
// import LogIn from "../views/LogIn";
// import ProductsListTable from "../views/ProductsListTable";
import Parent from "../views/Parent";
import LogInPage from "../views/LogInPage";
import RegisterPage from "../views/RegisterPage";
import HomePage from "../views/HomePage";
import FacePage from "../views/FacePage";
import EyesPage from "../views/EyesPage";
import LipsPage from "../views/LipsPage";
import CheeksPage from "../views/CheeksPage";
import ProductDetailPage from "../views/ProductDetailPage";
import CartsPage from "../views/CartsPage";
import AccountPage from "../views/AccountPage";


  const router = createBrowserRouter(
    [
      {
          element: <Parent />,
          children: [
            {
                path: "*",
                element: <HomePage />,
            },
              {
                  path: "/login",
                  element: <LogInPage />,
              },
              {
                  path: "/register",
                  element: <RegisterPage />,
              },
              {
                path: "/home",
                element: <HomePage />,
            },
              {
                path: "/face",
                element: <FacePage />,
            },
              {
                  path: "/eyes",
                  element: <EyesPage />,      
              },
              {
                path: "/lips",
                element: <LipsPage />,      
            },
            {
                path: "/cheeks",
                element: <CheeksPage />,      
           },
            {
                path: "/product/:id",
                element: <ProductDetailPage />,      
            },
            {
                path: "/cart",
                loader: () => {
                    //Cek apakah ada token di localStorage
                    const token = localStorage.getItem('access_token');

                    //Jika tidak ada, maka redirect ke halaman login
                    if (!token) {
                    return redirect('/login');
                    }

                    //Harus ada sesuatu yang direturn pada loader
                    //sehingga kita return null saja cukup
                    return null;
                },
                element: <CartsPage />,      
            },
            {
                path: "/account",
                loader: () => {
                    //Cek apakah ada token di localStorage
                    const token = localStorage.getItem('access_token');

                    //Jika tidak ada, maka redirect ke halaman login
                    if (!token) {
                    return redirect('/login');
                    }

                    //Harus ada sesuatu yang direturn pada loader
                    //sehingga kita return null saja cukup
                    return null;
                },
                element: <AccountPage />,      
            },
          ]
      }
  ]);
  
  export default router