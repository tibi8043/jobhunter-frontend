import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../Redux/Slices/authSlice";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }: any) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    console.log("authenticated");
    return children;
  }

  return <Navigate to={`/login`}></Navigate>;
}
