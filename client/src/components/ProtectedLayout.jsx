import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
