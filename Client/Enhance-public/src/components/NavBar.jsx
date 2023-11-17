import { Link, useNavigate } from "react-router-dom";
import {googleLogout} from '@react-oauth/google'



const NavBar = () => {
    let navigate = useNavigate()

    const logInButtonHandler = (id) => {
    
    
        navigate(`/login`);
        
      };



      const registerButtonHandler = () => {
    
    
        navigate(`/register`);
        
      };
    

      const cartButtonHandler = () => {
    
        
        navigate(`/cart`);
        
      };
    

      const myAccountButtonHandler = () => {
    
    
        navigate(`/account`);
        
      };

      const logOutHandler = () => {
    
        localStorage.clear();
        googleLogout()
        navigate(`/login`);
        
      };
    
    



    return (
        <>
<nav className=" top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
  <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">


    {/* 1ST */}
    <a href="#" className="flex items-center">


      {/* LOGO */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="mr-3 h-6 text-blue-500 sm:h-9"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
      {/* END OF LOGO */}



      {/* BRAND NAME */}
      <span className="self-center whitespace-nowrap text-xl font-semibold">
        ENHANCE
      </span>
      {/* END OF BRAND NAME */}



    </a>
    {/* 1ST */}




    {/* 2ND */}
    <div
      className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
      id="navbar-sticky"
    >
      <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
        
        
        {/* HOME */}
        <li>
          <Link
            to="/home"
            className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
            aria-current="page"
          >
            HOME
          </Link>
        </li>
        {/* END OF HOME */}

        
        {/* FACE */}
        <li>
          <Link
            to="/face"
            className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
            aria-current="page"
          >
            FACE
          </Link>
        </li>
        {/* END OF FACE */}



        {/* EYES */}
        <li>
          <Link
            to="/eyes"
            className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
          >
            EYES
          </Link>
        </li>
        {/* END OF EYES */}



        {/* LIPS */}
        <li>
          <Link
            to="/lips"
            className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
          >
            LIPS
          </Link>
        </li>
        {/* END OF LIPS */}



        {/* CHEEKS */}
        <li>
          <Link
            to="cheeks"
            className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
          >
            CHEEKS
          </Link>
        </li>
        {/* END OF CHEEKS */}


      </ul>
    </div>
    {/* 2ND */}





    {/* 3RD */}
    <div className="mt-2 sm:mt-0 sm:flex md:order-2">
      {/* Login Button */}
      <button
        type="button"
        className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
        onClick={logInButtonHandler}
      >
        Login
      </button>
      {/* END OF LOGIN BUTTON */}



      {/* REGISTER BUTTON */}
      <button
        type="button"
        className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
        onClick={registerButtonHandler}
      >
        Register
      </button>
      {/* END OF Register Button */}




      {/* CART */}
      <button
        type="button"
        className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
        onClick={cartButtonHandler}
      >
        Cart
      </button>
      {/* END OF CART */}




      {/* MY ACCOUNT */}
      <button
        type="button"
        className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
        onClick={myAccountButtonHandler}
      >
        My Account
      </button>
      {/* END OF MY ACCOUNT */}

      {/* MY ACCOUNT */}
      <button
        type="button"
        className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
        onClick={logOutHandler}
      >
        Log Out
      </button>
      {/* END OF MY ACCOUNT */}

    </div>
    {/* 3RD */}




  </div>
</nav>
        </>
    )
}

export default NavBar