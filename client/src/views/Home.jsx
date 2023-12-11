import { useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Home({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

    // user data (that is currently logged in)
    const [user, setUser] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/user-info`, {
                    headers: { Authorization: token }
                });
                setUser(data);
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

    // user BMI and recipe recommendation data
    const [analysisResult, setAnalysisResult] = useState({});
    const [recRecipe, setRecRecipe] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/recipes/recommend`, {
                    headers: { Authorization: token }
                });
                setAnalysisResult(data);
                
                const recipe = await axios.get(`${url}/recipes/${data.idealRecipe.recipeId}`, {
                    headers: { Authorization: token }
                });
                setRecRecipe(recipe.data);
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
                if (error.response?.status == 400) {
                    Swal.fire({
                        icon: "info",
                        title: "Profile Incomplete",
                        text: "Complete your profile to get personalised recommendations of recipes!"
                    })
                }
            }
        })();
    }, [])

    // recipe data
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/recipes`, {
                    headers: { Authorization: token }
                });
                setRecipes(data);
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
        {/* user data section */}
        { analysisResult.user && (<>
        <h1 className="text-2xl mt-6 mb-3 mx-4">Welcome Back <span className="text-bold">{user.name}</span></h1>
        <p className="text-lg mb-3 mx-4">Your BMI is <span className="text-bold">{analysisResult.user?.bmi}</span></p>
        <p className="text-lg mb-3 mx-4">You are <span className="text-bold">{analysisResult.user?.classification}</span></p>
        

        {/* recommended recipe section */}
        <h2 className="text-bold text-xl mt-6 mb-3 mx-4">Recommended</h2>
        <div className="grid grid-cols-2 gap-3">
            <figure className="m-4">
                <img src={recRecipe.imageUrl} alt="" className="object-cover w-[100%] rounded-lg shadow-lg" />
            </figure>
            <div className="m-4 [&>p]:my-2">
                <h3 className="text-xl text-bold mb-4">{recRecipe.name}</h3>
                <p className="text-lg mb-4">{recRecipe.calories} Calories</p>
                <div className="flex gap-4 mb-4">
                    <p>Carbs - {recRecipe.carbs} g</p>
                    <p>Fat - {recRecipe.fat} g</p>
                    <p>Protein - {recRecipe.protein} g</p>
                </div>
                <Link to={`/recipes/${analysisResult.idealRecipe?.recipeId}`}>
                    <button className="border-2 rounded-lg w-32 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">Read More</button>
                </Link>
            </div>
        </div>
        </>)}

        {/* list of recipes section */}
        <h2 className="text-bold text-xl mt-6 mb-3 mx-4">Recipes</h2>
        <div className="grid grid-cols-5 gap-3">
            { recipes.map(recipe => {
                return <Card key={recipe.id} recipe={recipe} user={user} url={url} setRecipes={setRecipes} />
            }) }
        </div>

        <div className="m-4">
            <p>Looking to create your own custom recipe?
                <Link to="/recipes/add">
                    <button className="border-2 rounded-lg w-28 mx-2 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">Click here</button>
                </Link>
            </p>
        </div>
    </>)
}