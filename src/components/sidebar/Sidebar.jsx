import './sidebar.css';
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { RiDashboard2Fill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineLaptop } from "react-icons/ai";

import Logo from "../../assets/images/logo.png";

const Sidebar = () => {
  let sidebarOpen = true;

  return (
    // w-52 = open sidebar // w-20: closed sidebar
    <div id="main__sidebar" className="sidebar h-full transition-all duration-300 ease-in-out  ">
      <div className="h-14 bg-white flex items-center justify-center">
          <img src={Logo} alt="Sebn_TN" className="w-auto h-10" />
        
      </div>
      <div className="flex flex-col w-full gap-4 px-6 py-4  ">
        {/* Dashboard:::: */}
        <div className=" flex justify-between items-center text-gray-300 hover:text-white  ">
          <div
            className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "" : "text-3xl"
            }`}
          >
            <RiDashboard2Fill className="" />
            <Link
              to="/"
              className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
            >
              Dashboard
            </Link>
          </div>
          {/* <div className={`sidebar__link ${sidebarOpen ? "ml-10" : "hidden"}`}>
            <MdArrowForwardIos />
          </div> */}
        </div>
        {/* articles:::: */}
        <div className=" flex justify-between items-center text-gray-300 hover:text-white  ">
          <div
            className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "" : "text-3xl"
            }`}
          >
            <AiOutlineLaptop className=" " />
            <Link
              to="/articles"
              className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
            >
              Articles
            </Link>
          </div>
          {/* <div className={`sidebar__link ${sidebarOpen ? "ml-10" : "hidden"}`}>
            <MdArrowForwardIos />
          </div> */}
        </div>
        
        {/* users:::: */}
        <div className=" flex justify-between items-center text-gray-300 hover:text-white  ">
          <div
            className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "" : "text-3xl"
            }`}
          >
            <FiUsers className="" />
            <Link
              to="/users"
              className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
            >
              Users
            </Link>
          </div>
          {/* <div className={`sidebar__link ${sidebarOpen ? "ml-10" : "hidden"}`}>
            <MdArrowForwardIos />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
