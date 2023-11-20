import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../baseUrl";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageProfile, setImageProfile] = useState("");

  const inputImageFileHandler = (event) => {
    const inputImageFile = event.target.files[0];
    setImageProfile(inputImageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("imageProfile", imageProfile);

      let result = await axios.post(`${URL}/user/register`, formData);
      Swal.fire({
        icon: "success",
        title: "Register Successfully",
        text: "Thank you for Registering!",
      });
      navigate("/"); // Ganti "/Home" dengan "/Login"
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-black">
                <h3 className="mb-0">Form Pendaftaran</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="username"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageProfile">Image Profile:</label>
                    <input
                      type="file"
                      className="form-control"
                      id="imageProfile"
                      name="imageProfile"
                      onChange={inputImageFileHandler}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Daftar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
