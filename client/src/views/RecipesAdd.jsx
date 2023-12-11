import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

/**
 * Here, users are NOT going to insert each of the row data to add a new recipe.
 * Instead, they will search for an existing recipe using a 3rd-party API (Spponacular),
 * and have an option to add that recipe to our database.
 */
export default function RecipesAdd({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

    const [foundRecipe, setFoundRecipe] = useState({});
    const [search, setSearch] = useState("");

    // check if logged in
    useEffect(() => {
        (async () => {
            try {
                await axios.get(`${url}/user-info`, {
                    headers: { Authorization: token }
                });
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

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${url}/recipes/api-search?search=${search}`, {
                headers: { Authorization: token }
            });
            setFoundRecipe(data);
            // setFoundRecipe({
            //     "name": "Egg Salad Wrap",
            //     "summary": "Egg Salad Wrap is a <b>dairy free and lacto ovo vegetarian</b> main course. This recipe serves 2 and costs $1.88 per serving. One portion of this dish contains approximately <b>26g of protein</b>, <b>34g of fat</b>, and a total of <b>572 calories</b>. A mixture of hardboiled eggs, lettuce, vinegar, and a handful of other ingredients are all it takes to make this recipe so scrumptious. Not a lot of people made this recipe, and 1 would say it hit the spot. It is brought to you by Foodista. From preparation to the plate, this recipe takes about <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 63%</b>, which is pretty good. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/egg-salad-wrap-1451201\">Egg Salad Wrap</a>, <a href=\"https://spoonacular.com/recipes/avocado-egg-salad-wrap-1645497\">Avocado Egg Salad Wrap</a>, and <a href=\"https://spoonacular.com/recipes/avocado-egg-salad-wrap-549299\">Avocado Egg Salad Wrap</a>.",
            //     "instructions": "Combine in a bowl the hardboiled eggs, red onions, parsley, dill, capers, mustard, vinegar, drizzle of olive oil, honey and seasonings.  Mash with a fork and toss.\nHeat the wraps.\nAdd the fresh lettuce, pickles and egg salad and roll tight.",
            //     "imageUrl": "https://spoonacular.com/recipeImages/1096010-312x231.jpg",
            //     "ingredients": "hardboiled eggs, onion, parsley, dill, capers - plus tsp. of caper juice, mustard, vinegar, drizzle of olive oil, honey, salt, pepper, chili powder, lettuce, bread and butter pickles, tortilla wraps",
            //     "calories": 571.81,
            //     "fat": 34.12,
            //     "carbs": 39.8,
            //     "sugar": 11.09,
            //     "cholesterol": 559.5,
            //     "sodium": 935.85,
            //     "protein": 25.96,
            //     "fiber": 4.42
            // });
        }  catch (error) {
            console.log(error);
            if (error.response?.status == 404) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message
                });
            }
            if (error.response?.status == 401) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message
                });
                navigate("/login");
            }
        }
    }

    async function handleAdd(event) {
        event.preventDefault();
        const {
            name,
            summary,
            instructions,
            imageUrl,
            ingredients,
            calories,
            carbs,
            protein,
            fat,
            sugar,
            fiber,
            sodium,
            cholesterol,
        } = foundRecipe;
        try {
            await axios.post(`${url}/recipes`, {
                name,
                summary,
                instructions,
                imageUrl,
                ingredients,
                calories,
                carbs,
                protein,
                fat,
                sugar,
                fiber,
                sodium,
                cholesterol,
            }, {
                headers: { Authorization: token }
            })
            navigate("/");
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
    }

    return (<>
    <div className="flex flex-col gap-3 justify-center items-center w-full mt-5">
        <form>
            <div className="flex flex-col justify-center items-center gap-3 mb-5">
                <h1 className="text-bold">Find your recipe here</h1>
                <h2>You will be shown the best-matched recipe based on your search query.</h2>
                <div className="w-60 text-[0.5rem]">Note: don't do this too often. I'm using a third-party API to search, and there's a daily quota limit of 150 points. Please. :)</div>
            </div>
            <div className="col-span-2 flex justify-between">
                <input 
                    onChange={(event) => { setSearch(event.target.value) }} 
                    type="text" 
                    id="search" 
                    name="search" 
                    className="border rounded mx-4 px-2 w-[100%]"
                    placeholder="search for a recipe..."
                />
                <button 
                    onClick={handleSubmit}
                    type="submit" 
                    className="border-2 rounded-lg w-24 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
                >
                    Search
                </button>
            </div>
        </form>
    </div>

    { foundRecipe.name && (
        <div className="mx-4 my-6">
            <Hero recipe={foundRecipe} />
            <div className="pr-24 flex justify-end items-center">
                <button 
                    onClick={handleAdd}
                    className="border-2 rounded-lg w-24 px-4 py-1 mb-4 mt-8 bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
                >
                    Add
                </button>
            </div>
        </div>
    )}
    </>)
}