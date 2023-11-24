import NavbarUserComponent from "../components/NavbarUserComponent";
import FooterComponent from "../components/FooterComponent";

import { Outlet } from "react-router-dom";

const Parent = () => {
  return (
    <>
      <NavbarUserComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default Parent;
