import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default BaseLayout