import axios from "axios"
import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { URL } from "../configs/config"

const BASE_URL = URL

const LoginPage = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const inputs = e.target.value

    setLoginInput({
      ...loginInput,
      [e.target.name]: inputs,
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()

      const { data } = await axios.post(`${BASE_URL}/user/login`, loginInput)

      localStorage.setItem("access_token", data.access_token)

      navigate("/")
    } catch (err) {
      console.error(err);
    }
  }

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/google-login`, null, {
        headers: {
          token: codeResponse.credential
        }
      })
      localStorage.setItem("access_token", data)
      navigate("/")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1>SIGN IN</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="m-[2rem]">
            <label htmlFor="email">EMAIL</label>
            <input type="text" name="email" autoComplete="off" placeholder="your@email.com" onChange={onChangeHandler} />
          </div>
          <div className="m-[2rem]">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" name="password" autoComplete="off" placeholder="Password goes here" onChange={onChangeHandler} />
          </div>
          <button type="submit" className="m-[2rem]">LOG IN</button>
          <div>
            <h1>Login with Google Account</h1>
            <GoogleLogin onSuccess={googleLogin} />
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage