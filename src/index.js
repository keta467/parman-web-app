import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DebugModeProvider } from "./components/DebugModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <DebugModeProvider>
    <App />
  </DebugModeProvider>
);
