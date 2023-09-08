import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppBarAll from "./component/AppBarAll";
import { DataProvider } from "./context/DataProvider";
import "./index.css";
import "./lokalisierung/i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
