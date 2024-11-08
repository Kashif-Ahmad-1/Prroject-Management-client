import React, { useState } from "react";
import clsx from "clsx";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";
import TaskDialog from "./task/TaskDialog";
import AssignToDeveloperModal from './AssignToDeveloperModal';
// Priority icons based on priority
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task, onTaskDeleted }) => {
  const [open, setOpen] = useState(false);

  // Extracting relevant task information
  const { _id, projectName, projectTitle, dateProject, priority, price, projectCompletionTime, websiteType, development, figmaDesign, backendDevelopment } = task;

  const assignDeveloper = {
    development: development?.assignDeveloper,
    figmaDesign: figmaDesign?.assignDeveloper,
    backendDevelopment: backendDevelopment?.assignDeveloper
  };

  return (
    <div className="w-full h-[450px] bg-white shadow-md rounded-lg p-6 space-y-4 overflow-hidden">
      {/* Top Header: Project Name & Priority */}
      <div className="flex justify-between items-center">
        <div
          className={clsx(
            "flex gap-2 items-center text-sm font-medium",
            priority === "high" ? "text-red-500" : "text-gray-500"
          )}
        >
          <span className="text-lg">{ICONS[priority]}</span>
          <span className="uppercase">{priority} Priority</span>
        </div>
        <TaskDialog task={task} onTaskDeleted={onTaskDeleted} />
      </div>

      {/* Project Name */}
      <div className="text-2xl font-bold text-gray-800">{projectName}</div>

      {/* Project Title */}
      <div className="flex items-center gap-2">
        <h4 className="line-clamp-1 text-black text-lg">{projectTitle}</h4>
      </div>

      {/* Project Date */}
      <span className="text-sm text-gray-600">{new Date(dateProject).toLocaleDateString()}</span>

      {/* Divider */}
      <div className="w-full border-t border-gray-200 my-3" />

      {/* Activity, Assets, Subtasks */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{0}</span> {/* Placeholder for activity count */}
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <MdAttachFile />
            <span>{task?.assets?.length}</span> {/* Asset count */}
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <FaList />
            <span>{0}</span> {/* Placeholder for subtask count */}
          </div>
        </div>
      </div>

      {/* Additional Project Details */}
      <div className="mt-4 space-y-2 overflow-auto">
        <h5 className="text-sm font-semibold">Price: <span className="font-normal">${price}</span></h5>
        <h5 className="text-sm font-semibold">Completion Time: <span className="font-normal">{projectCompletionTime}</span></h5>
        <h5 className="text-sm font-semibold">Website Type: <span className="font-normal">{websiteType}</span></h5>
      </div>

      {/* Add Subtask Button */}
      <div className="w-full pt-4 mt-auto">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold hover:text-gray-700"
        >
          <IoMdAdd className="text-lg" />
          <span>ADD SUBTASK</span>
        </button>
      </div>

      {/* Add Subtask Modal */}
      <AssignToDeveloperModal open={open} setOpen={setOpen} taskId={_id} onAssignComplete={onTaskDeleted} />
    </div>
  );
};

export default TaskCard;
