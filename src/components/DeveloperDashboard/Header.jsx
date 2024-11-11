import React from "react";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Title from "../../components/Title";

const Header = ({ setOpen, toggleSidebar }) => {
  return (
    <div className="w-full bg-white shadow-lg flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Title title="Tasks" />
      </div>

      <button className="md:hidden" onClick={toggleSidebar}>
        <span className="text-3xl">☰</span> {/* Hamburger icon */}
      </button>
    </div>
  );
};

export default Header;
