import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Layout from "./Pages/Layout/Layout";
import Menu from "./Pages/Layout/Menu";
import Login from "./Pages/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",        
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
