import axios from "axios";
import React, { useState } from "react";
import { URL } from "../../baseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbarHome";

const FormPost = () => {
  // console.log("hehehe");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const inputImageFileHandler = (event) => {
    const inputImageFile = event.target.files[0];
    setImageUrl(inputImageFile);
  };
  // console.log(inputImageFileHandler);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("imageUrl", imageUrl);
      formData.append("caption", caption);
      formData.append("title", title);
      await axios.post(`${URL}/post`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Post added successfully",
        text: "Welcome to your home page!",
      });
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Add Post</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="caption" className="form-label">
                      Caption
                    </label>
                    <textarea
                      className="form-control"
                      id="caption"
                      rows="3"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={inputImageFileHandler}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Add Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPost;
