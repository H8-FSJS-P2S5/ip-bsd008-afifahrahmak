import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const NavBar = () => {
  const navigate = useNavigate();

  const handleAddOnClick = () => {
    navigate("/addAdvice");
  };

  const handleDeleteOnClick = () => {
    navigate("/myAdvice");
  };

  const handleChatOnclick = () => {
    navigate("/chat");
  };

  const handleLogoutOnclick = () => {
    localStorage.clear();
    googleLogout();
    navigate("/");
  };

  const handleHomeOnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <nav className=" text-[#FFC5C5] shadow-2xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="  flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className=" inline-flex items-center justify-center rounded-md p-2 text-rose-400 hover:bg-rose-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-rose-900 text-white", Default: "text-rose-300 hover:bg-rose-700 hover:text-white" --> */}
                  <button
                    className="bg-rose-900 text-2xl rounded-md px-3 py-2  font-bold "
                    aria-current="page"
                    onClick={handleHomeOnClick}
                  >
                    Pituah
                  </button>
                  <button
                    className="text-rose-300 hover:bg-rose-700 hover:text-white
                  rounded-md px-3 py-2 text-sm 
                  font-medium text-md"
                    onClick={handleAddOnClick}
                  >
                    Add new advice
                  </button>
                  <button
                    className="text-rose-300 hover:bg-rose-700 
                    hover:text-white rounded-md 
                    px-3 py-2 text-sm font-medium text-md"
                    onClick={handleDeleteOnClick}
                  >
                    Delete or Update your advice
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <!-- Profile dropdown --> */}
              <button
                onClick={handleChatOnclick}
                className="text-rose-300 hover:bg-rose-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-md"
              >
                Chat to others
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <!-- Profile dropdown --> */}
              <button
                onClick={handleLogoutOnclick}
                className="text-rose-300 hover:bg-rose-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-rose-900 text-white", Default: "text-rose-300 hover:bg-rose-700 hover:text-white" --> */}
            <a
              href="#"
              className="bg-rose-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-rose-300 hover:bg-rose-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-rose-300 hover:bg-rose-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-rose-300 hover:bg-rose-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
