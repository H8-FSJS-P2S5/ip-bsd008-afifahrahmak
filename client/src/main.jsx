import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID_GOOGLE = import.meta.env.VITE_CLIENT_ID_GOOGLE || "";
// console.log(CLIENT_ID_GOOGLE);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
