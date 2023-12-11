import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Card({ url, user, recipe, setRecipes }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;

    // delete recipe (only recipes belong to user can be deleted)
    async function deleteOnClick(event) {
        try {
            event.preventDefault();
            await axios.delete(`${url}/recipes/${recipe.id}`, {
                headers: { Authorization: token }
            });
            const { data } = await axios.get(`${url}/recipes`, {
                headers: { Authorization: token }
            });
            setRecipes(data);
        } catch (error) {
            console.log(error);
            if (error.response.status == 401) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message
                });
                navigate("/login");
            }
        }
    }

    return (<>
        <div className="border bg-slate-100 rounded-md p-4 m-4 flex flex-col justify-between">
            <Link to={`/recipes/${recipe.id}`}>
                <figure>
                    <img src={recipe.imageUrl} alt="" />
                </figure>
                <div>
                    <p className="text-bold text-center my-4">{recipe.name}</p>
                    <p className="text-center my-4">{Math.round(recipe.Nutrient.calories)} Calories</p>
                    
                </div>
            </Link>
            { (user.id == recipe.userId) &&
                (<button 
                    onClick={deleteOnClick} 
                    className="border-2 rounded-lg w-28 mx-2 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
                >
                    Delete
                </button>)
            }
        </div>
    </>)
}