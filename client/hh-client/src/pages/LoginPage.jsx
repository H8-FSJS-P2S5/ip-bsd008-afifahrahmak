import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both email and password are required");
      Swal.fire({
        title: "Error!",
        text: "Both email and password are required",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address");
      Swal.fire({
        title: "Error!",
        text: "Please provide a valid email address",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      localStorage.setItem("access_token", response.data.access_token);
      Swal.fire({
        title: "Success!",
        text: "You are now logged in.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to login");
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to login",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Login error:", error);
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const googleToken = response.credential;
      const backendResponse = await axios.post(
        "http://localhost:3000/google-auth",
        null,
        { headers: { token: googleToken } }
      );
      localStorage.setItem("access_token", backendResponse.data.access_token);
      Swal.fire({
        title: "Success!",
        text: "You are now logged in.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      setError("Failed to login with Google");
      console.error("Error during Google authentication:", error);
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "226534053064-4mj0q9ks32c5q1nel23o9da90jkka735.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
    window.google.accounts.id.prompt();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow">
            <Row className="g-0 align-items-center flex-column-reverse flex-lg-row">
              <Col lg={6} className="d-flex justify-content-center">
                <Card.Body className="w-100">
                  <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <h3 className="text-center mb-1">Login </h3>
                    <p className="text-center mb-4">
                      belum punya akun?<a href="/register"> Register</a>{" "}
                    </p>
                    <Form onSubmit={handleSubmit} className="w-75">
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        className="mb-3 w-100"
                      >
                        Sign In
                      </Button>
                    </Form>

                    <p style={{ margin: "0 10px 10px" }}>or</p>

                    {/* Google Login */}
                    <div id="buttonDiv"></div>
                  </div>
                </Card.Body>
              </Col>
              <Col lg={6}>
                <Card.Img
                  src="https://images.pexels.com/photos/7176036/pexels-photo-7176036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Describe the Image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
