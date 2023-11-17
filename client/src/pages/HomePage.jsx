import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbarHome";
import axios from "axios";
import { URL } from "../../baseUrl";
// import "../index.css";
import { jwtDecode } from "jwt-decode";
import PostCard from "../components/PostCard";
import Swal from "sweetalert2";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const access_token = localStorage.getItem("access_token");
  const decodedToken = access_token ? jwtDecode(access_token) : null;
  const currentUserId = decodedToken ? decodedToken.id : null;
  const fetchPosts = async () => {
    try {
      const data = await axios.get(`${URL}/post/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setPosts(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const hasLiked = posts.map((el) => {
        return el.id === postId;
      });
      // console.log(hasLiked);
      if (hasLiked) {
        await axios.post(
          `${URL}/post/${postId}/like`,
          {
            postId,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        // Update the UI to indicate that the post has been liked
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost.id === postId
              ? {
                  ...prevPost,
                  Likes: [...prevPost.Likes, { UserId: currentUserId }],
                }
              : prevPost
          )
        );
        Swal.fire({
          text: "success",
        });
        console.log("Post liked successfully");
      } else {
        console.log("Post already liked by the user");
        // You may want to show a message to the user indicating that they've already liked the post
      }
    } catch (error) {
      console.log(error);
    }
  };
  // fetchPosts();
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <section>
        <Navbar />
        {/* Centered "Add Post" button */}
        {/* Main Content */}

        <div className="container mt-5">
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
                {/* Post Content */}
                <PostCard
                  post={post}
                  handleLike={handleLike}
                  currentUserId={currentUserId}
                  fetchPosts={fetchPosts}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
