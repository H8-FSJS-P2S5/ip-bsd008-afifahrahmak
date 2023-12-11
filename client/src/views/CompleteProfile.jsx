import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function CompleteProfile({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

    // complete user data to get a personalised recommendation of recipes
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${url}/user-info`, {
                    headers: { Authorization: token }
                });
                
                // populate data with current user values
                const { name, gender, age, height, weight } = data;
                setName(name ? name : undefined);
                setGender(gender ? gender : undefined);
                setAge(age ? age : undefined);
                setHeight(height ? height : undefined);
                setWeight(weight ? weight : undefined);
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
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { name, age, gender, height, weight }
        try {
            await axios.put(`${url}/complete-profile`, data, {
                headers: { Authorization: token }
            });
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
            if (error.response?.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "Bad Request",
                    text: error.response.data.message
                })
            }
        }
    }


    return (<>
    <div className="flex flex-col gap-3 justify-center items-center w-full">
        <h1 className="text-bold mt-4">Complete Your Profile</h1>
        <h2>Fill your data below to get personalised recommendations of recipes!</h2>
        <form className="p-8 w-[70%] bg-slate-100 grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-between">
                <label htmlFor="name">Name</label>
                <input onChange={(event) => { setName(event.target.value) }} value={name}
                    type="text" id="name" name="name" className="border rounded mx-4 w-[100%] px-1" />
            </div>

            <div className="flex justify-between">
                <label htmlFor="gender">Gender</label>
                <select onChange={(event) => { setGender(event.target.value) }} value={gender}
                    name="gender" id="gender" className="border mx-4 w-[100%] px-1">
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="flex justify-between">
                <label htmlFor="age">Age</label>
                <input onChange={(event) => { setAge(event.target.value) }} value={age}
                type="number" id="age" name="age" className="border mx-4 w-[100%] px-1" />
            </div>

            <div className="flex justify-between">
                <label htmlFor="height">Height (cm)</label>
                <input onChange={(event) => { setHeight(event.target.value) }} value={height}
                type="number" step="0.1" id="height" name="height" className="border mx-4 w-[70%] px-1" />
            </div>

            <div className="flex justify-between">
                <label htmlFor="weight">Weight (kg)</label>
                <input onChange={(event) => { setWeight(event.target.value) }} value={weight}
                type="number" step="0.1" id="weight" name="weight" className="border mx-4 w-[70%] px-1" />
            </div>

            <div>
                <button onClick={handleSubmit} type="submit" className="rounded-lg w-24 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">Submit</button>
                <Link to="/"><button className="rounded-lg w-24 px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">Skip</button></Link>
            </div>
        </form>
    </div>
    </>)
}