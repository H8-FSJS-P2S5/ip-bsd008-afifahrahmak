import { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Logo from "../assets/logohh.png";
import axios from "axios";

const NavbarUserComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:3000/profile/name",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          // Periksa apakah data pengguna ada dalam respons
          console.log(response);
          if (response.data && response.data.user) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Hapus token akses dari penyimpanan lokal
      localStorage.removeItem("access_token");
      googleLogout();

      // Arahkan pengguna ke halaman login atau halaman lain yang sesuai
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
          <Navbar.Brand className="fs-3 fw-bold" href="/dashboard">
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
              <Nav.Link href="/dashboard/reservations">Reservations</Nav.Link>
            </Nav>
            <div className="text-center">
              <NavDropdown
                key={user.id}
                title={`Hi, ${user.username}`}
                id="basic-nav-dropdown"
                className="btn btn-outline-warning"
              >
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarUserComponent;
