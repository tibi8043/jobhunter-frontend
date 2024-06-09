import { Outlet } from "react-router-dom";
import Menu from "./Menu";

export default function Layout() {
  return (
    <>
      <Menu></Menu>
      <div className="md:w-100 lg:w-5/6 mx-auto bg-slate-800 p-4 lg:rounded-xl items-center flex flex-col">
        <Outlet></Outlet>
      </div>
    </>
  );
}
