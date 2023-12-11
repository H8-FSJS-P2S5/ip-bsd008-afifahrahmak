import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";


export default function Login({ url }) {
    const token = `Bearer ${localStorage.getItem("accessToken")}`;
    const navigate = useNavigate();

    // check if logged in, and redirect to home page if already logged in
    useEffect(() => {
        (async () => {
            try {
                if (!localStorage.getItem("accessToken")) return;
                await axios.get(`${url}/user-info`, {
                    headers: { Authorization: token }
                });
                navigate("/recipes");
            } catch (error) {
                if (error.response?.status == 401) {
                    // do nothing
                } else {
                    console.log(error);
                }
            }
        })();
    }, [])

    // if not, process login
    async function googleLogin(codeResponse) {
        try {
            const { data } = await axios.post(`${url}/login`, {}, {
                headers: { token: codeResponse.credential }
            });
            localStorage.setItem("accessToken", data);
            navigate("/recipes");
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <div className="min-h-screen flex flex-col gap-3 justify-center items-center">
            <h1 className="text-xl text-bold">FSJS-Food</h1>
            <GoogleLogin onSuccess={googleLogin} />
        </div>
    </>)
}