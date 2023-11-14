import React from "react";
import { URL } from "../../baseUrl";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

// import { useOAuth } from "@react-oauth/google";
const ButtonGoogle = () => {
  const handleGoogleSignIn = async () => {
    try {
      const response = await axios.post(`${URL}google-login`, null, {
        headers: {
          token: `1006553177092-blmgnbocpnp59ndi2i902ha3q6uq7l7k.apps.googleusercontent.com`,
        },
      });
      console.log(response);

      // Lakukan sesuatu setelah pengguna berhasil login
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      // Lakukan penanganan kesalahan jika diperlukan
    }
  };

  return (
    <button
      className="btn btn-lg btn-block btn-primary"
      style={{ backgroundColor: "#dd4b39" }}
      type="button"
      onClick={handleGoogleSignIn}
    >
      <i className="fab fa-google me-2"></i> Sign in with Google
    </button>
  );
};

export default ButtonGoogle;
