import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../baseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCommentForm = ({
  postId,
  onCommentAdded,
  fetchPosts,
  fetchComments,
}) => {
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `${URL}/post/${postId}/comment`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Swal.fire({
        text: "success",
      });

      setNewComment(response.data.response.comment);
      // navigate("/Home");
      // fetchPosts();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchComments();
    // fetchPosts();
  }, []);

  return (
    <div className="mt-3">
      <div className="input-group">
        <textarea
          className="form-control"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="2" // Adjust the number of rows as needed
        />
        <button
          className="btn btn-primary"
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default AddCommentForm;
