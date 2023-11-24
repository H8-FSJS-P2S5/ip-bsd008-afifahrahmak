import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Modal,
  Card,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const ReservationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    meetingType: "Offline",
    description: "",
    topicId: "",
    psychologistId: "",
    session_count: 1,
  });
  const [topic, setTopics] = useState([]);
  const [konselor, setKonselor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showKonselorModal, setShowKonselorModal] = useState(false);
  const [selectedKonselor, setSelectedKonselor] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:3000/topic", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTopics(response.data.topic);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch topics. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchKonselor = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:3000/konselor", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setKonselor(response.data.konselors);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch konselors. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchKonselor();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelection = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmitWithKonselor = async () => {
    if (!selectedKonselor) {
      // Tampilkan pesan kesalahan jika konselor belum dipilih
      Swal.fire({
        title: "Error!",
        text: "Please choose a psychologist before making a reservation.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Lanjutkan dengan membuat reservasi dengan konselor yang dipilih
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://localhost:3000/reservation",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Reservation created successfully",
        icon: "success",
        confirmButtonText: "Go to Payment",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/payment");
        }
      });
    } catch (error) {
      setError(error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create reservation",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ paddingTop: 100, paddingBottom: 100 }}
    >
      <Container className="md-5">
        <Row>
          <Col md={12} lg={10} xl={8} className="mx-auto">
            <h1>Create Reservation</h1>
            <div className="card">
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  {/* Date Selection */}
                  <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={formatDate(new Date())}
                    />
                  </Form.Group>

                  {/* Time Selection */}
                  <Form.Group className="mb-3" controlId="time">
                    <Form.Label>Select Time</Form.Label>
                    <div>
                      <Button
                        style={{ marginRight: 5 }}
                        variant={
                          formData.time === "10:00"
                            ? "warning"
                            : "outline-warning"
                        }
                        onClick={() => handleTimeSelection("time", "10:00")}
                      >
                        10:00 AM
                      </Button>{" "}
                      <Button
                        style={{ marginRight: 5 }}
                        variant={
                          formData.time === "13:00"
                            ? "warning"
                            : "outline-warning"
                        }
                        onClick={() => handleTimeSelection("time", "13:00")}
                      >
                        1:00 PM
                      </Button>{" "}
                      <Button
                        style={{ marginRight: 5 }}
                        variant={
                          formData.time === "16:00"
                            ? "warning"
                            : "outline-warning"
                        }
                        onClick={() => handleTimeSelection("time", "16:00")}
                      >
                        4:00 PM
                      </Button>{" "}
                    </div>
                  </Form.Group>

                  {/* Duration Selection */}
                  <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Select Duration</Form.Label>
                    <div>
                      <Button
                        style={{ marginRight: 5 }}
                        variant={
                          formData.duration === "1"
                            ? "warning"
                            : "outline-warning"
                        }
                        onClick={() => handleTimeSelection("duration", "1")}
                      >
                        1 Hour
                      </Button>{" "}
                      <Button
                        style={{ marginRight: 5 }}
                        variant={
                          formData.duration === "2"
                            ? "warning"
                            : "outline-warning"
                        }
                        onClick={() => handleTimeSelection("duration", "2")}
                      >
                        2 Hours
                      </Button>{" "}
                      <Button
                        style={{ marginRight: 5 }}
                        variant={
                          formData.duration === "3"
                            ? "warning"
                            : "outline-warning"
                        }
                        onClick={() => handleTimeSelection("duration", "3")}
                      >
                        3 Hours
                      </Button>{" "}
                    </div>
                  </Form.Group>

                  {/* Other Form Fields */}
                  <Form.Group className="mb-3" controlId="meetingType">
                    <Form.Label>Meeting Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="meetingType"
                      value={formData.meetingType}
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="topicId">
                    <Form.Label>Topic</Form.Label>
                    <Form.Select
                      name="topicId"
                      value={formData.topicId}
                      onChange={handleChange}
                    >
                      <option value="">Select a topic</option>
                      {Array.isArray(topic) &&
                        topic.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.topic_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="topicId">
                    <Button
                      variant="primary"
                      onClick={() => setShowKonselorModal(true)}
                      className="mb-2"
                    >
                      Choose Psychologist
                    </Button>
                    {selectedKonselor && (
                      <p>Selected Psychologist: {selectedKonselor.name}</p>
                    )}
                  </Form.Group>

                  <Button variant="warning" onClick={handleSubmitWithKonselor}>
                    Make Reservation
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Choosing Psychologist */}
      <Modal
        show={showKonselorModal}
        onHide={() => setShowKonselorModal(false)}
        size="xl"
        className="d-flex justify-content-center align-items-center"
        style={{ paddingTop: 500 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose a Psychologist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {Array.isArray(konselor) &&
              konselor.map((konselor) => (
                <Col md={3} key={konselor.id}>
                  <Card
                    style={{
                      cursor: "pointer",
                      height: 450,
                    }}
                    onClick={() => setSelectedKonselor(konselor)}
                    className="mb-3"
                  >
                    <Card.Img
                      variant="top"
                      src={konselor.photoImage}
                      alt={konselor.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "250px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{konselor.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Specialization: {konselor.specialization}
                      </Card.Subtitle>
                      <Card.Text>
                        Hourly Rate: {konselor.hourly_rate}
                        <br />
                        Availability: {konselor.availability}
                        <br />
                        Email: {konselor.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowKonselorModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowKonselorModal(false);
              handleSubmitWithKonselor();
            }}
          >
            Pilih Konselor
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReservationForm;
