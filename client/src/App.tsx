import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Layout from "./Pages/Layout/Layout";
import Menu from "./Pages/Layout/Menu";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import RequireAuth from "./Pages/Auth/Require";
import Profile from "./Pages/Profile/Profile";
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
        element: <Register />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
