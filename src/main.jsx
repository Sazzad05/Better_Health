import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ResponsiveGuard from "./ResponsiveGuard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResponsiveGuard>
      <App />
    </ResponsiveGuard>
  </React.StrictMode>
);