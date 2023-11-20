import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbarHome";
import { URL } from "../../baseUrl";
const FormEditPost = () => {
  const { postId } = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${URL}/post`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setAllPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, [access_token]);

  useEffect(() => {
    const selectedPost = allPosts.find((post) => post.id === Number(postId));

    if (selectedPost) {
      setTitle(selectedPost.title);
      setCaption(selectedPost.caption);
      setExistingImage(selectedPost.imageUrl);
      setImageUrl(selectedPost.imageUrl); // Menetapkan nilai default untuk pratinjau
    }
  }, [allPosts, postId]);

  const inputImageFileHandler = (event) => {
    const inputImageFile = event.target.files[0];
    console.log(inputImageFile);
    // setImageUrl(URL.createObjectURL(inputImageFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("imageUrl", imageUrl);
      formData.append("caption", caption);
      formData.append("title", title);

      // Edit existing post
      await axios.put(`${URL}/post/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("heheh");
      Swal.fire({
        icon: "success",
        title: "Post updated successfully",
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
                <h5 className="card-title text-center mb-4">Edit Post</h5>
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
                    <label htmlFor="existingImage" className="form-label">
                      Existing Image
                    </label>
                    {existingImage && (
                      <img
                        src={existingImage}
                        alt="Existing Post Image"
                        className="img-fluid mb-3"
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      New Image
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
                      Update Post
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

export default FormEditPost;
