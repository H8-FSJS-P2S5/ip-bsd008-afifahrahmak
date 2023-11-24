import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ServiceOptions = () => {
  const navigate = useNavigate();

  const handlePilihLayanan = () => {
    // Arahkan pengguna ke URL yang sesuai dengan jenis layanan
    navigate("/dashboard/psycolog-type/offline-type");
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Container>
        <h2 className="text-center my-4">Mau pilih layanan yang mana?</h2>
        <p className="text-center mb-4">
          Berbagai pilihan layanan konseling sesuai kebutuhanmu
        </p>
        <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
          {/* Konseling Instan */}
          <Col>
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>Konseling Online</Card.Title>
                <Card.Text>
                  Konselor selalu siap untuk mendengarkanmu kapanpun
                </Card.Text>
                <Button variant="warning disabled">Jadwalkan Sekarang</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Konseling Offline */}
          <Col>
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>Konseling Offline</Card.Title>
                <Card.Text>
                  Bertemu langsung dan ceritakan masalah ke Konselor
                </Card.Text>
                <Button onClick={() => handlePilihLayanan()} variant="warning">
                  Jadwalkan Sekarang
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServiceOptions;
