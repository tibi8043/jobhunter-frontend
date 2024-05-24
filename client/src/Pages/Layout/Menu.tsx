import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <h1>Jobhunter</h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>
                <NavLink to="/">Home</NavLink>
              </a>
            </li>
            <li>
              <a>
                <NavLink to="/register">Sign up</NavLink>
              </a>
            </li>
            <li>
              <NavLink to="/login">
                <a>Login</a>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end"></div>
      </div>
    </>
  );
}
