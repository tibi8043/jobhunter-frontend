import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../../Redux/Slices/authSlice";

export default function Menu() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(isAuthenticated);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </div>
          <NavLink className="btn btn-ghost text-xl" to="/">
            Jobhunter
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <div className="flex flex-row gap-2">
              <a className="btn" onClick={() => handleLogout()}>
                Logout
              </a>
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <NavLink className="btn" to="/register">
                Sign up
              </NavLink>
              <NavLink className="btn" to="/login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
