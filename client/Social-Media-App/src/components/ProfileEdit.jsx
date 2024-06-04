// src/components/ProfileEdit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profiles/${id}`
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [id]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:3000/profiles/${id}`, user);
      navigate(`/profiles/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          >
            <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
              Edit Profile
            </h1>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={user?.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                bio
              </label>
              <textarea
                name="bio"
                value={user?.bio}
                onChange={handleInputChange}
                placeholder="Bio"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
