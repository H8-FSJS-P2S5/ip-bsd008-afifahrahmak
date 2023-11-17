import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="440787234650-i5jno1tvodb3ilv3s1h1nakisouvo5sj.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
