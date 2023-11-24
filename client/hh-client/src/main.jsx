import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

import "bootstrap/dist/css/bootstrap.min.css";
import "./dist/css/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
