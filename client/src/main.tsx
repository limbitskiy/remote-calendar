import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-green/theme.css";
import "./assets/styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PrimeReactProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PrimeReactProvider>
  </Provider>
);
