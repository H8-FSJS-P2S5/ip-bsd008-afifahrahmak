import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Background from "../assets/bg1.png";
import NavbarComponent from "../components/NavbarComponent";

const HomePage = () => {
  let navigate = useNavigate();

  return (
    <div className="homepage">
      <NavbarComponent />
      {/* Header */}
      <header className="w-100 min-vh-100 d-flex align-items-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6">
              <h1 className="animate__animated animate__fadeInLeft animate__delay-1s">
                <span>Solusi Terbaik Kembalikan Senyum Bahagiamu</span>
                <br />
              </h1>
              <p className="animate__animated animate__fadeInLeft animate__delay-1s">
                Butuh ruang aman dan nyaman untuk bercerita? <br /> Psikolog
                profesional siap membantu selesaikan berbagai masalahmu. <br />
                Cepat, tepat, dan bersahabat.
              </p>
              <button
                className="btn btn-warning btn-lg rounded-pill animate__animated animate__fadeInLeft animate__delay-1s"
                style={{ fontSize: 15, height: 50, width: 200 }}
                onClick={() => navigate("/login")}
              >
                Mulai Konseling
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img
                src={Background}
                alt="Background"
                className="animate__animated animate__fadeInUp"
              />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default HomePage;
