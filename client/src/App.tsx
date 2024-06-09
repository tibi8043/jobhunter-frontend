import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Layout from "./Pages/Layout/Layout";
import Menu from "./Pages/Layout/Menu";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import RequireAuth from "./Pages/Auth/Require";
import UserProfile from "./Pages/Profile/UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import JobAdvertiserProfile from "./Pages/Profile/JobAdvertiserProfile";
import JobDescription from "./Pages/Layout/JobDescription";

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
        path: "profile/company",
        element: (
          <RequireAuth>
            <JobAdvertiserProfile />
          </RequireAuth>
        ),
      },
      {
        path: "jobs/:id",
        element: <JobDescription />,
      },
      {
        path: "profile/user",
        element: (
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
