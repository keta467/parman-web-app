import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App"
import { DebugModeProvider } from "./components/providers/DebugModeProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DebugModeProvider>
      <App />
    </DebugModeProvider>
  </React.StrictMode>
);