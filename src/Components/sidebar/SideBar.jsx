import React from "react";
import { FaCog, FaUser, FaTachometerAlt, FaPlusCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Add Task", path: "/AddTask", icon: <FaPlusCircle /> },
  ];

  return (
    <aside className="w-full rounded-2xl border bg-cyan-800 p-4 shadow-lg lg:w-64 lg:p-6">
      <div className="mb-4 flex items-center justify-between lg:mb-6 lg:block">
        <h2 className="text-xl font-bold text-amber-50 sm:text-2xl">My App</h2>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200 lg:hidden"
        >
          Logout
        </button>
      </div>

      <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex min-w-fit items-center gap-3 rounded-lg px-3 py-3 transition ${
                isActive
                  ? "bg-amber-50 font-semibold text-cyan-800"
                  : "text-amber-100 hover:bg-amber-50 hover:text-cyan-800"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span className="whitespace-nowrap text-sm sm:text-base">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="hidden lg:block lg:flex-grow" />

      <button
        onClick={handleLogout}
        className="mt-6 hidden w-full items-center justify-center rounded-lg bg-red-100 px-4 py-3 font-bold text-red-600 transition hover:bg-red-200 lg:flex"
      >
        Logout
      </button>
    </aside>
  );
};

export default SideBar;
