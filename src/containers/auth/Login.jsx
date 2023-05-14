import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

import { path } from "../../utils/Variables";
import Logo from "../../assets/images/logo.png";
import Login_pic from "../../assets/images/login.jpg";

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });



  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      if (!/\S+@\S+\.\S+/.test(e.target.value) || e.target.value === "") {
        // errors.email = "Please enter a valid email address";
        setErrors((prevState) => ({
          ...prevState,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: null,
        }));
      }
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      if (e.target.value.length < 3 || e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          password: "Password must be at least 8 characters long",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          password: null,
        }));
      }
    }
    // setErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errors.email != null || errors.password != null) {
      return swal("Error!", "check your Inputs", "error");
    }

    try {
      const response = await fetch(`${path}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      console.log(result);
      if (result.success === true) {
        swal("Success!", result.message, "success");
        const jsonvalue = JSON.stringify(result.data);
        cookies.set("user", jsonvalue);
        return navigate("/");
      } else {
        return swal("Error!", result.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center rounded-tr-md rounded-br-md ">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1  ">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="w-full self-start">
            <img src={Logo} className="w-32 mx-auto" alt="" />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <input
                    className={`w-full px-8 py-4 rounded-lg font-medium  border  
                    placeholder-gray-500 text-sm focus:outline-none
                    ${
                      errors.email
                        ? " bg-red-50 border-2 border-red-700"
                        : "bg-gray-100 border border-gray-200 "
                    }
                    `}
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => onchange(e)}
                    placeholder="Example@gmail.com"
                  />
                  <span className="text-sm text-red-700 font-sm -mt-1">
                    {errors.email}
                  </span>
                  <input
                    className={`w-full px-8 py-4 rounded-lg font-medium  placeholder-gray-500 text-sm mt-5 
                    focus:outline-none
                    ${
                      errors.password
                        ? " bg-red-50 border-2 border-red-700"
                        : "bg-gray-100 border border-gray-200 "
                    }
                    `}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => onchange(e)}
                    placeholder="Password"
                  />
                  <span className="text-sm text-red-700 font-sm -mt-1">
                    {errors.password}
                  </span>
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign In</span>
                  </button>
                  <div className="w-full">
                    <span className="text-sm font-medium" >You don't have an account ? <Link to="/register" className="text-indigo-500">Sign Up</Link></span>
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="mt-8 self-center " id="SignInID"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="w-full bg-contain bg-center bg-no-repeat rounded-tr-md rounded-br-md "
          >
            <img src={Login_pic} alt="login_pic" className="w-full h-full rounded-tr-md rounded-br-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
