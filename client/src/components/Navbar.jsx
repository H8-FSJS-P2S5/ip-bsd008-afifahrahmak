import { googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()

  function logoutHandler() {
    localStorage.clear()
    googleLogout()
    navigate("/login")
  }
  return (
    <>
      <div>
        <button type="submit" onClick={logoutHandler}>Logout</button>
      </div>
    </>
  )
}

export default Navbar