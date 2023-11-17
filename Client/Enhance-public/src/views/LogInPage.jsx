import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonLR from "../components/ButtonLR"


const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate()


  const inputEmailOnChangeHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const inputPasswordOnChangeHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const loginButtonHandler = async (evt) => {
    evt.preventDefault();

    //console.log(email, password);

    try {
      // Kirim ke backend
      // POST /login
      // JSON { email, password }
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      console.log(response.data.access_token);

      //simpen data di local storage
      localStorage.setItem("access_token", response.data.access_token);

      // Pindahin ke halaman lain
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
        {/* Halaman Login */}
      <section>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage: "url('https://hips.hearstapps.com/hmg-prod/images/two-beautiful-girls-with-make-up-royalty-free-image-1647875716.jpg?crop=1.00xw:0.668xh;0,0.113xh&resize=1200:*')"}}>
          <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
            <div className="text-white">

              {/* Judul & SubJudul dari Halaman Login */}
              <div className="mb-8 flex flex-col items-center">
                <a href="#"
                  className=" block text-3xl px-4  ml-2 py-2 rounded text-white font-bold hover:text-black mt-4 lg:mt-0">Log In</a>
                <span className="text-gray-300">Enter Login Details</span>
              </div>
              {/* end of Judul & SubJudul dari Halaman Login */}


              <form onSubmit={loginButtonHandler}>

              {/* Email dari Halaman Login */}
                <div className="mb-4 text-lg">
                  <input 
                  className="rounded-3xl border-none bg-red-700 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" 
                  type="text" 
                  onChange={inputEmailOnChangeHandler}
                  value={email} 
                  placeholder="id@email.com" />
                </div>
              {/* end of Email dari Halaman Login */}


              {/* Password dari Halaman Login */}
              <div className="mb-4 text-lg">
                  <input 
                  className="rounded-3xl border-none bg-red-700 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" 
                  type="Password" 
                  value={password}
                  onChange={inputPasswordOnChangeHandler} 
                  placeholder="*********" />
              </div>
              {/* end of Password dari Halaman Login */}

              {/* Button Login dari Halaman Login */}   
              <ButtonLR buttonName="Login"/>
              {/* end of Button Login dari Halaman Login */}   

              </form>
            </div>
          </div>
        </div>
      </section>
    {/* end of Halaman Login */}
    </>
  );
};

export default LogInPage;