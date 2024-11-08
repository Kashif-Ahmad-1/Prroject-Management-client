import React from "react";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Title from "../components/Title";

const Header = ({ setOpen, toggleSidebar }) => {
  return (
    <div className="w-full bg-blue-600 shadow-md fixed top-0 left-0 z-40 flex items-center justify-between p-4 text-white">
      {/* Hamburger Icon for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-white p-2 rounded-full hover:bg-blue-500"
      >
        <IoMdAdd className="text-2xl" />
      </button>

      <div className="flex items-center gap-4">
        <Title title="Tasks" />
      </div>

      {/* Create Task Button */}
      <Button
        onClick={() => setOpen(true)}
        label="Create Task"
        icon={<IoMdAdd className="text-lg" />}
        className="bg-blue-700 hover:bg-blue-800 text-white rounded-md py-2 px-4 flex items-center gap-2"
      />
    </div>
  );
};

export default Header;
