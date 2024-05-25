import ReactDOM, { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Home";
import React from "react";
import Login from "./Pages/Auth/Login";
import App from "./App";
import "../src/index.css";
import { Provider } from "react-redux";
import store from "./Redux/store";


const container = document.getElementById("root");

const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
