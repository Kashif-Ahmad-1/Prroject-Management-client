import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdTaskAlt, MdSettings } from "react-icons/md";
import { FaTasks, FaUsers, FaTrashAlt } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { label: "Dashboard", icon: <MdDashboard />, link: "/dashboard" },
    { label: "Tasks", icon: <FaTasks />, link: "/tasks" },
    { label: "Completed", icon: <MdTaskAlt />, link: "/completed" },
    { label: "Team", icon: <FaUsers />, link: "/team" },
    { label: "Trash", icon: <FaTrashAlt />, link: "/trashed" },
  ];

  return (
    <div>
      {/* Hamburger Menu Button on Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-white p-2 rounded-full">
          {isOpen ? (
            <IoMdClose className="text-3xl" />
          ) : (
            <IoMdMenu className="text-3xl" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 transition-transform transform z-40`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">TaskMe</h1>
        </div>
        <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default Sidebar;
