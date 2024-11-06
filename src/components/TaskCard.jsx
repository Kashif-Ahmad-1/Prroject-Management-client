import React, { useState } from "react";
import clsx from "clsx";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";
import TaskDialog from "./task/TaskDialog";
// Priority icons based on priority
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const [open, setOpen] = useState(false);

  // Extracting relevant task information
  const { _id, projectName, projectTitle, dateProject, priority, price, projectCompletionTime, websiteType, development, figmaDesign, backendDevelopment } = task;
  
  const assignDeveloper = {
    development: development?.assignDeveloper,
    figmaDesign: figmaDesign?.assignDeveloper,
    backendDevelopment: backendDevelopment?.assignDeveloper
  };

  return (
    <div className="w-full h-fit bg-white shadow-md p-4 rounded">
      <div className="w-full flex justify-between">
        <div
          className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", priority === "high" ? "text-red-500" : "text-gray-500")}
        >
          <span className="text-lg">{ICONS[priority]}</span>
          <span className="uppercase">{priority} Priority</span>
        </div>
        <TaskDialog task={task} />
      </div>

      <div className="flex items-center gap-2">
        <h4 className="line-clamp-1 text-black">{projectTitle}</h4>
      </div>
      <span className="text-sm text-gray-600">{new Date(dateProject).toLocaleDateString()}</span>

      <div className="w-full border-t border-gray-200 my-2" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{0}</span> {/* Placeholder for activity count */}
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <MdAttachFile />
            <span>{0}</span> {/* Placeholder for asset count */}
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <FaList />
            <span>{0}</span> {/* Placeholder for subtask count */}
          </div>
        </div>
      </div>

      {/* Additional Project Details */}
      <div className="mt-4">
        <h5 className="text-sm font-semibold">Price: ${price}</h5>
        <h5 className="text-sm font-semibold">Completion Time: {projectCompletionTime}</h5>
        <h5 className="text-sm font-semibold">Website Type: {websiteType}</h5>
      </div>

     

      <div className="w-full pb-2">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold"
        >
          <IoMdAdd className="text-lg" />
          <span>ADD SUBTASK</span>
        </button>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={_id} />
    </div>
  );
};

export default TaskCard;
