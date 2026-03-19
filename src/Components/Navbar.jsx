import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [islogin, setLogin] = useState(false);
  const navigate = useNavigate();


  const handleLog = () => {
    navigate("/");
  };
  const username=localStorage.getItem("email");

  return (
    <nav className="w-full h-[70px] flex items-center justify-between px-6 md:px-10 bg-white shadow-md sticky top-0 z-50">
      {/* Logo & User */}
      <div className="flex items-center gap-10">
        <h1
          className="text-2xl font-bold text-red-600 tracking-wide cursor-pointer"
          onClick={handleLog}
        >
          <span className="text-cyan-800">Task</span>Manager
        </h1>

        <div className="hidden md:flex flex-col text-gray-700">
          <h2 className="font-semibold">{username}</h2>
          <p className="text-sm">Welcome back!</p>
        </div>
      </div>

   

      {/* Login / Logout */}
      {/* <div>
        {islogin ? (
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Login
          </NavLink>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;