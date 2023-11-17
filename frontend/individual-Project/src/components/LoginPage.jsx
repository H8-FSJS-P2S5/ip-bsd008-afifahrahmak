import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useGoogleOneTapLogin } from '@react-oauth/google';

const LoginPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const googleLogin = async (codeResponse) => {
    try {
      console.log(codeResponse);

      const { data } = await axios.post(
        "http://localhost:3000/google-login",
        null,
        {
          headers: {
            token: codeResponse.credential,
          },
        }
      );
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post("http://localhost:3000/login", input);
      console.log("suksess login");
      localStorage.setItem("access_token", data.access_token);

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    navigate("/register");
  };

  return (
    <>
      <section className="py-[200px]">
        <div className="relative mx-auto w-full max-w-md bg-[#FFC5C5] px-6 pt-10 pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 py-10 ">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-[#860A35]">Sign in</h1>
              <p className="mt-2 text-[#860A35]">
                Sign in below to access your account
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleOnSubmit}>
                <div className="relative mt-6">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className=" mt-1 w-full bg-[#FFC5C5] border-b-2 border- px-0 py-1 placeholder:text-transparent border-[#860A35] focus:outline-none text-[#860A35]"
                    autoComplete="off"
                    name="email"
                    value={input.email}
                    onChange={handleOnChange}
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-[#860A35] opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#860A35] peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-[#860A35]"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative mt-6">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className=" mt-1 w-full bg-[#FFC5C5] border-b-2 border- px-0 py-1 placeholder:text-transparent border-[#860A35] focus:outline-none text-[#860A35]"
                    name="password"
                    value={input.password}
                    onChange={handleOnChange}
                  />
                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-[#860A35] opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#860A35] peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-[#860A35]"
                  >
                    Password
                  </label>
                </div>
                <div className="my-6">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#860A35] px-3 py-4 text-[#FFC5C5] focus:bg-[#860A35] focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-center text-sm text-[#860A35]">
                  Don&#x27;t have an account yet?
                  <button
                    className="font-semibold text-[#860A35]
                    hover:underline 
                    focus:text-[#860A35] 
                    focus:outline-none"
                    onClick={handleOnClick}
                  >
                    Sign up
                  </button>
                  .
                </p>
              </form>
              <div className="my-6">
                <div className="w-full rounded-md  px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">
                  <GoogleLogin onSuccess={googleLogin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
