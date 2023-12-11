import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

export default function RecipesDetail({ url }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = `Bearer ${localStorage.getItem("accessToken")}`;

    const [recipe, setRecipe] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/recipes/${id}`, {
                    headers: { Authorization: token }
                });
                setRecipe(data);
            } catch (error) {
                console.log(error);
                if (error.response?.status == 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message
                    });
                    navigate("/login");
                }
            }
        })();
    }, [])

    return (<>
    <div className="mx-4 my-6">
        <Hero recipe={recipe} />
    </div>
    </>)
}