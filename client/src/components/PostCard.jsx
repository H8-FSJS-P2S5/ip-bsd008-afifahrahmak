import { useState, useEffect } from "react";
import { URL } from "../../baseUrl";
import useTimeAgo from "../helpers/index";
import ShowComments from "../components/ShowComment";
import AddCommentForm from "./FormAddComment";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PostCard = ({ post, handleLike, fetchPosts, currentUserId }) => {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState([]);
  const access_token = localStorage.getItem("access_token");

  const fetchComment = async () => {
    try {
      let data = await axios.get(`${URL}/post/${post.id}/comment`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setComment(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = ({ postId }) => {
    // console.log(post, "iniii");
    navigate(`/Edit-Post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      Swal.fire({
        text: "Post sudah dihapus",
      });
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    fetchComment();
    fetchPosts();
  }, []);

  const addComment = (newComment) => {
    setComment([...comment, newComment]);
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex align-items-center">
        <img
          src={post.User.imageProfile}
          className="rounded-circle me-2"
          width="30"
          height="30"
          alt="User Profile"
        />
        <strong>{post.User.username}</strong>
        <div className="ms-auto ">
          {currentUserId === post.userId && (
            <>
              <Link
                onClick={() => handleEditPost(post.id)}
                post={post}
                style={{ color: "blue", marginRight: "8px" }}
              >
                Edit
              </Link>
              <Link
                onClick={() => handleDeletePost(post.id)}
                style={{ color: "red" }}
              >
                Delete
              </Link>
            </>
          )}
        </div>
      </div>
      <img
        src={post.imageUrl}
        className="card-img-top rounded"
        style={{
          objectFit: "cover",
          height: "400px",
        }}
        alt="Post Image"
      />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.caption}</p>
        <small className="text-muted">{useTimeAgo(post.createdAt)}</small>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => handleLike(post.id)}
            >
              Like
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => toggleComments(post.id)}
            >
              {showComments ? "Hide Comments" : "View Comments"}
            </button>
          </div>
          <div>
            <span className="me-2">{post.Likes.length} Likes</span>
            <span>{post.Comments.length} Comments</span>
          </div>
        </div>
        {showComments && (
          <div>
            <h6>Comments:</h6>
            <hr />
            {comment.map((el) => (
              <div key={el.id}>
                <li>{JSON.stringify(el.User.username)}</li>
                <p>{el.comment}</p>
                {/* <p>{timeAgo(el.createdAt)}</p> */}
              </div>
            ))}
            <div className="mt-3">
              <AddCommentForm postId={post.id} onCommentAdded={addComment} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
