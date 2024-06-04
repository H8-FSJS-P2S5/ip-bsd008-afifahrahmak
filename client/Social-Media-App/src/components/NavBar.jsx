import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { googleLogout } from "@react-oauth/google";

const NavBar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = authState && authState.token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    logout();
    googleLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          {/* Logo or Brand Name */}
          <img
            className="w-20 h-20"
            src="https://panels.twitch.tv/panel-241851496-image-3ec669f7-33b8-4238-99eb-ec2919604610"
            alt="logo"
          />
        </Link>
        <ul className="flex space-x-6">
          {isLoggedIn ? (
            <>
              {/* Logged in user navigation */}
              <li className="hover:underline">
                <Link to="/" className="text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li className="hover:underline">
                <Link
                  to={`/profiles/${authState.user?.id}`}
                  className="text-white transition duration-300"
                >
                  My Profile
                </Link>
              </li>
              <li className="hover:underline">
                <Link
                  to="/translator"
                  className="text-white transition duration-300"
                >
                  Translator
                </Link>
              </li>
              <div className="flex items-center space-x-4">
                <img
                  src={authState.user?.avatar}
                  alt={authState.user?.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white">{authState.user?.username}</span>
              </div>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Guest user navigation */}
              <li className="hover:underline">
                <Link
                  to="/login"
                  className="text-white transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li className="hover:underline">
                <Link
                  to="/register"
                  className="text-white transition duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
