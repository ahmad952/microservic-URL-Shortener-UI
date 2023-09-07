import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./component/App";
import Output from "./component/Output";
import { DataProvider } from "./context/DataProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
      <Output />
    </DataProvider>
  </React.StrictMode>
);
