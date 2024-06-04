// src/components/Profile.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profiles/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      await axios.put(`http://localhost:3000/profiles/${id}`, {
        ...user,
        profile_picture: downloadURL,
      });
      navigate(`/profiles/${id}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            src={user?.profile_picture || "default-profile-pic.jpg"} // Placeholder if no image
            alt={user?.name}
            className="rounded-full h-24 w-24 object-cover"
          />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p>{user?.bio}</p>
        </div>
      </div>
      <form onSubmit={handleImageUpload} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
