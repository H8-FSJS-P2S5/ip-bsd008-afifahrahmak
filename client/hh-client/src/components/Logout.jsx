import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Hapus token akses dari penyimpanan lokal
      localStorage.removeItem("accessToken");

      // Arahkan pengguna ke halaman login atau halaman lain yang sesuai
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <a onClick={handleLogout}>Logout</a>;
}

export default LogoutButton;
