import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdTaskAlt, MdSettings } from "react-icons/md";
import { FaTasks, FaUsers, FaTrashAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { label: "Dashboard", icon: <MdDashboard />, link: "/supervisor-dashboard" },
    { label: "Tasks", icon: <FaTasks />, link: "/supervisor-dashboard" },
    // { label: "Completed", icon: <MdTaskAlt />, link: "/completed" },
    // { label: "Team", icon: <FaUsers />, link: "/team" },
    // { label: "Trash", icon: <FaTrashAlt />, link: "/trashed" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 z-20 bg-gray-800 text-white p-4 w-64 transition-all transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:block md:translate-x-0`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">TaskMe</h1>
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
          >
            <span className="text-3xl">☰</span> {/* Hamburger icon */}
          </button>
        </div>

        {links.map((link) => (
          <Link
            to={link.link}
            key={link.label}
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}

        <div className="mt-auto">
          <Link
            to="/settings"
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <MdSettings />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
