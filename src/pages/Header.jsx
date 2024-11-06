import React from "react";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Title from "../components/Title";

const Header = ({ setOpen }) => {
  return (
    <div className="w-full bg-white shadow-lg flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Title title="Tasks" />
      </div>
     
    </div>
  );
};

export default Header;
