import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../baseUrl";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });
      const access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to your home page!",
      });
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  async function handleGoogleLogin(codeResponse) {
    try {
      const { data } = await axios.post(`${URL}/user/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });

      const access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to your home page!",
      });
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: "Google login failed. Please try again.",
      });
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1em" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <span>
                  <Link className="nav-link" to="/Register">
                    {" "}
                    Belum punya akun? Daftar dulu{" "}
                  </Link>
                </span>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-white"
                      htmlFor="typeEmailX-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-white"
                      htmlFor="typePasswordX-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      placeholder="****************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    className={`btn btn-primary btn-lg btn-block ${
                      isLoading ? "disabled" : ""
                    }`}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
                <hr className="my-4" />
                <GoogleLogin onSuccess={handleGoogleLogin}>
                  <span className="me-2">Login with Google</span>
                  <img
                    src="path-to-your-google-icon.svg"
                    alt="Google Icon"
                    height="20"
                    width="20"
                  />
                </GoogleLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
