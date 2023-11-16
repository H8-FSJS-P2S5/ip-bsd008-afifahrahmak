import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ButtonLR from "../components/ButtonLR"


const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let navigate = useNavigate()

  
  const fullNameHandler = (evt) => {
    setFullName(evt.target.value);
  };

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
  };


  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const phoneNumberHandler = (evt) => {
    setPhoneNumber(evt.target.value);
  };



  const submitHandler = async (evt) => {
    evt.preventDefault();

    //console.log(email, password);

    try {
      // Kirim ke backend
      // POST /login
      // JSON { email, password }
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:3000/register', {
        fullName,
        email,
        password,
        phoneNumber
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    

      // Pindahin ke halaman lain
      navigate("/login");
    } catch (err) {
      console.log("err");
    }
  };

  return (
    <>
      {/* Halaman Add User */}
       <section className="container px-4 mx-auto bg-gray-100">

       <div className="h-screen md:flex" >

       {/* 1  */}
           <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{backgroundImage: "url('https://i.pinimg.com/564x/e2/91/b9/e291b95d7aca291ab57c68f7bf05c768.jpg')"}}>
               <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
               <div className="w-full px-24 z-10">
                   <h1 className="text-5xl text-pink-700 font-bold text-left tracking-wide">ENHANCE</h1>
                   <p className="text-3xl my-4 text-white"></p>
               </div>
           </div>
       {/* end of 1 */}

       {/* 2 */}
           <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
               <div className="bg-grey-lighter min-h-screen flex flex-col">
               <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

               {/* 2a */}
                   <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                       <h1 className="mb-8 text-3xl text-center font-bold">Register</h1>

                        <form  onSubmit={submitHandler}>

                       <input 
                           type="text"
                           className="block border border-grey-light w-full p-3 rounded mb-4"
                           name="fullName"
                           placeholder="Full Name"
                           onChange={fullNameHandler} />


                       <input 
                           type="text"
                           className="block border border-grey-light w-full p-3 rounded mb-4"
                           name="email"
                           placeholder="Email"
                           onChange={emailHandler} />


                       <input 
                           type="password"
                           className="block border border-grey-light w-full p-3 rounded mb-4"
                           name="password"
                           placeholder="Password"
                           onChange={passwordHandler} />


                       <input 
                           type="text"
                           className="block border border-grey-light w-full p-3 rounded mb-4"
                           name="phoneNumber"
                           placeholder="Phone Number"
                           onChange={phoneNumberHandler} />


                    <ButtonLR buttonName="Register"/>  


                    </form>


                       <div className="text-center text-sm text-grey-dark mt-4">
                           By signing up, you agree to the 
                           <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                               Terms of Service
                           </a> and 
                           <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                               Privacy Policy
                           </a>
                       </div>

                   </div>
               {/* end of 2a */}

               {/* 2b */}
                   <div className="text-grey-dark mt-6">
                       Already have an account? 
                       <Link to="/login" className="no-underline border-b border-blue text-blue">
                           Log in
                       </Link>
                   </div>
               {/* end of 2b */}

               </div>
               </div>
           </div>
       {/* end of 2 */}

       </div>

       </section>
     {/* end of Halaman Add User */}
    </>
  );
};

export default RegisterPage;