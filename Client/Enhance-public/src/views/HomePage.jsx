
import { useNavigate } from "react-router-dom";

const HomePage = () => {

let navigate = useNavigate()

    const faceHandler = (id) => {
    
    
        navigate(`/face`);
        
      };

      const eyeHandler = (id) => {
    
    
        navigate(`/eyes`);
        
      };

      const lipHandler = (id) => {
    
    
        navigate(`/lips`);
        
      };

      const cheekHandler = (id) => {
    
    
        navigate(`/cheeks`);
        
      };









    return (
    <>
  {/* 1ST */}
  {/* BRAND NAME & SLOGAN */}
  <div className="pt-32  bg-white">
    <h1 className="text-center text-2xl font-bold text-gray-800">
      <b>ENHANCE</b>
    </h1>
    <h1 className="text-center text-2xl font-bold text-gray-800">
      Why Blend in When You Can Stand Out!
    </h1>
  </div>
  {/* BRAND NAME & SLOGAN */}


  {/* Tab Menu */}
  <div className="flex flex-wrap items-center  overflow-x-auto overflow-y-hidden py-10 justify-center   bg-white text-gray-800">
    <a
      rel="noopener noreferrer"
      href="#"
      className="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      <span>VEGAN COSMETICS BRAND</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
      <span>NOT TESTED ON ANIMALS</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span>100% HALAL CERTIFIED</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <circle cx={12} cy={12} r={10} />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
      <span>REGISTERED ON BPOM</span>
    </a>
  </div>
  {/* 1ST */}







  {/* 2ND */}
  {/* SHOP BY CATEGORY */}
  <section className="py-10 bg-gray-100">
    <h1 className="text-center text-2xl font-bold text-gray-800">
      SHOP BY CATEGORY
    </h1>
    <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      
      
      
      {/* FACE CATEGORY */}
      <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img
              src="https://i.pinimg.com/564x/ed/32/36/ed3236e429777961c5bc7d35ed60bb61.jpg"
              alt="Hotel Photo"
            />
            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-1 p-2">
            <h2 className="text-slate-700">FACE</h2>
            <div className="mt-3 flex items-end justify-between">
              <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                <button className="text-sm" onClick={faceHandler}>All Face Product</button>
              </div>
            </div>
          </div>
        </a>
      </article>
      {/* FACE CATEGORY */}



      {/* EYES CATEGORY */}
      <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img
              src="https://i.pinimg.com/564x/c0/66/9e/c0669eab8a968bb9afbc3eab46fcb830.jpg"
              alt="Hotel Photo"
            />
            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-1 p-2">
            <h2 className="text-slate-700">EYES</h2>
            <div className="mt-3 flex items-end justify-between">
              <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                <button className="text-sm" onClick={eyeHandler}>All Eye Product</button>
              </div>
            </div>
          </div>
        </a>
      </article>
      {/* EYES CATEGORY */}



      {/* LIPS CATEGORY */}
      <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img
              src="https://i.pinimg.com/564x/da/4c/d7/da4cd7f5e0cc366809a58420db77bc6f.jpg"
              alt="Hotel Photo"
            />
            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-1 p-2">
            <h2 className="text-slate-700">LIPS</h2>
            <div className="mt-3 flex items-end justify-between">
              <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                <button className="text-sm" onClick={lipHandler}>All Lip Product</button>
              </div>
            </div>
          </div>
        </a>
      </article>
      {/* LIPS CATEGORY */}


      {/* CHEEKS CATEGORY */}
      <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img
              src="https://i.pinimg.com/564x/59/ad/c8/59adc8aa228342b8e29dd90213bb6b1f.jpg"
              alt="Hotel Photo"
            />
            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-1 p-2">
            <h2 className="text-slate-700">CHEEKS</h2>
            <div className="mt-3 flex items-end justify-between">
              <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                <button className="text-sm" onClick={cheekHandler}>All Cheeks Product</button>
              </div>
            </div>
          </div>
        </a>
      </article>
      {/* CHEEKS CATEGORY */}
      
      {/* 2ND */}
    </div>
  </section>
    </>
    )
}

export default HomePage;