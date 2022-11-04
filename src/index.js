import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//index.htmlのDiv要素（id=root）にレンダリングしていく
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
