import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Parent = () => {
  return (
    <>
      <div className="min-h-screen bg-[#AF2655] ">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default Parent;
