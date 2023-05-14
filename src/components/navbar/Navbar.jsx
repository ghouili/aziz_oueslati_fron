import "./navbar.css";
import React, { useContext, useEffect, useRef, useState } from "react";
// import { Link } from 'react-router-dom';
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMdExpand } from "react-icons/io";
import { BiMoon, BiBell } from "react-icons/bi";
import Cookies from "universal-cookie";

import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../utils/Variables";
import { ProductsCart } from "../../containers";
import { GeneralContext } from "../../Hooks/context/GeneralContext";

const Navbar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    ToggleSidebar,
    HandleThemeSwitch,
    theme,
    openCart,
    setOpenCart,
  } = useContext(GeneralContext);

  const cookies = new Cookies();
  const navigate = useNavigate();
  let user = cookies.get("user");
  const menuRef = useRef(null);

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const Logout = async () => {
    cookies.remove("user");
    window.location.reload();
  };

  return (
    <>
      <div className="h-14 border-b flex flex-row items-center justify-between bg-white dark:bg-gray-700 shadow-md">
        {/* left side */}
        {!user || user.role === "user" ? (
          <div className="flex flex-row items-center pl-7 gap-10">
            <div className="">
              <img src={Logo} alt="Sebn_TN" className="w-auto h-10" />
            </div>

            <ul className="client_nav flex flex-row gap-4 text-lg font-medium ">
              <li className="text-gray-700 hover:text-blue-700 cursor-pointer">
                Home
              </li>
              <li className="text-gray-700 hover:text-blue-700 cursor-pointer">
                Sevices
              </li>
              <li className="text-gray-700 hover:text-blue-700 cursor-pointer">
                Testimonials
              </li>
              <li className="text-gray-700 hover:text-blue-700 cursor-pointer">
                Contact us
              </li>
              <li className="text-gray-700 hover:text-blue-700 cursor-pointer">
                Contact us
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex flex-row items-center pl-7 gap-4">
            <div className="cursor-pointer" onClick={() => ToggleSidebar()}>
              <CgMenuLeft size={24} color="#9F8C99" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search.."
                className="bg-gray-100 text-sm py-2 pl-10 pr-2 rounded-md border-none outli
             focus:outline-none"
              />
              <div className="absolute top-2 left-1.5  ">
                <AiOutlineSearch size={20} color="#9F8C99" />
              </div>
            </div>
          </div>
        )}
        {/* right side */}
        <div className="flex flex-row items-center gap-3 pr-7">
          <div
            className="relative p-2.5 rounded-full cursor-pointer hover:bg-blue-50 text-gray-600 hover:text-blue-400"
            onClick={() => {
              setOpenCart(!openCart);
            }}
          >
            <HiOutlineShoppingBag size={22} />
            <div className="absolute flex items-center justify-center rounded-full w-4 h-4 bg-blue-500 right-0 top-0 ">
              <p className="text-xs font-medium text-white ">5</p>
            </div>
          </div>
          <div
            className=" p-2.5 rounded-full cursor-pointer hover:bg-blue-50 text-gray-600 hover:text-blue-400"
            onClick={handleFullScreen}
          >
            <IoMdExpand size={22} />
          </div>
          <div
            className=" p-2.5 rounded-full cursor-pointer hover:bg-blue-50 text-gray-600 hover:text-blue-400"
            onClick={HandleThemeSwitch}
          >
            <BiMoon size={22} />
          </div>
          {!user ? null : (
            <div className="relative p-2.5 rounded-full cursor-pointer hover:bg-blue-50 text-gray-600 hover:text-blue-400">
              <BiBell size={22} />
              <div className="absolute flex items-center justify-center rounded-full w-4 h-4 bg-red-600 right-0 top-0 ">
                <p className="text-xs font-medium text-white ">5</p>
              </div>
            </div>
          )}
          {user ? (
            <div className="relative h-full w-full" ref={menuRef}>
              <div
                // ref={menuRef}
                onClick={() => setToggleMenu(!toggleMenu)}
                className="  p-2.5 h-full flex flex-row items-center gap-2 cursor-pointer 
        border-x font-semibold border-gray-200 bg-gray-100 text-gray-600 hover:text-white hover:bg-blue-900 "
              >
                <img
                  src={`${path}uploads/images/${user.avatar}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {user.prenom} {user.nom}
                  </span>
                  <span className="text-xs -mt-1">{user.email}</span>
                </div>
              </div>
              {!toggleMenu ? null : (
                <div
                  className="scale-up-ver-top shadow-md flex flex-col items-center gap-2 px-4 py-2 font-medium 
              rounded-md z-30 absolute top-12 right-7 bg-white border "
                >
                  <Link
                    to={`/user/${user._id}`}
                    className="w-full px-3 py-1 text-center hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    My Profile
                  </Link>
                  <div className="w-full border-b " />
                  <button
                    onClick={Logout}
                    className="w-full px-3 py-1 text-center hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              ref={menuRef}
              className=" relative  p-2.5 h-full flex flex-row items-center "
            >
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium
           text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 
           group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4
            focus:outline-none "
              >
                <span
                  className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md 
            group-hover:bg-opacity-0"
                >
                  Authenticate
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <div className={`${openCart ? "" : "hidden"}`}>
        <ProductsCart />
      </div> */}
    </>
  );
};

export default Navbar;
