import { googleLogout } from "@react-oauth/google";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data and navigate to the login page
    localStorage.clear();
    googleLogout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/Home">
            Instagram
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/Home">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Add-post">
                  <i className="fas fa-home"></i> Add Post
                </Link>
              </li>
              <li className="nav-item">
                {/* Logout Button */}
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
