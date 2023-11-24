import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/logohh.png";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const [changeColor, setChangeColor] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      changeBackgroundColor();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
        <Container>
          <Navbar.Brand className="fs-3 fw-bold" href="#home">
            <div className="d-flex align-items-center">
              <img
                src={Logo}
                alt=""
                className="navbar-logo"
                width="170"
                height="30"
              />
            </div>
          </Navbar.Brand>
          <h3
            style={{
              fontWeight: 600,
              paddingTop: 10,
            }}
          >
            Hacktiv Health
          </h3>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center" style={{ paddingTop: 10 }}>
              {/* <div className="nav-link">
                <NavLink to="/">Home</NavLink>
              </div> */}
            </Nav>
            <div className="text-center">
              <button
                className="btn btn-outline-warning btn-lg rounded-pill"
                style={{ width: 100, fontSize: 15 }}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
