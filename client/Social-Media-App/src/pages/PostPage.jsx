// src/pages/PostPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import Comment from "../components/CommentCard";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [setLoading] = useState(true);
  const [setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profiles/${id}`
        );
        setName(response.data.name);
        setBio(response.data.bio);
        setProfilePicture(response.data.profile_picture);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setPost({ ...post, Comments: [...post.Comments, newComment] });
  };

  const handleCommentDeleted = (commentId) => {
    setPost({
      ...post,
      Comments: post.Comments.filter((comment) => comment.id !== commentId),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <div className="flex justify-center items-center">
              <img
                className="w-24 h-24 rounded-full mx-auto"
                src={profile_picture}
                alt={name}
              />
            </div>
            <div className="text-center mt-4">
              <h1 className="block text-gray-700 font-bold mb-2 text-xl">
                {name}
              </h1>
              <p className="text-gray-600">{bio}</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
              {post?.title}
            </h1>
            <p className="text-gray-600">{post?.content}</p>
          </div>
          <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
          <div className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <Comment
              comment={post?.Comments}
              onDelete={handleCommentDeleted}
              postId={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
