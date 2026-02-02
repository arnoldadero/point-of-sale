import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./components/app/App";
import store from "./store";

import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const container = document.getElementById("root");
const root = createRoot(container);
const theme = createTheme();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

registerServiceWorker();
