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

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];


const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
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
      <div className="text-xl font-bold text-gray-800">{projectName}</div>

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

          <div className='flex flex-row-reverse'>
  {task?.teams?.map((m, index) => (
    <div
      key={m._id} // Use _id or any unique identifier as the key
      className={clsx(
        "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
        BGS[index % BGS?.length] // Assuming BGS is an array of background colors
      )}
    >
      <UserInfo user={m} /> {/* Passing the user object */}
    </div>
  ))}
</div>
        </div>

       

      </div>

      <div className="w-full border-t border-gray-200 my-3" /> 
      

      {/* Additional Project Details overflow-auto*/}
      <div className="mt-4 space-y-2 ">
        <h5 className="text-sm font-semibold">Price: <span className="font-normal">${price}</span></h5>
        <h5 className="text-sm font-semibold">Completion Time: <span className="font-normal">{projectCompletionTime}</span></h5>
        <h5 className="text-sm font-semibold">Project Type: <span className='bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium'>{websiteType}</span></h5>
        
      </div>

      {/* Add Subtask Button */}
      <div className="w-full pt-4 mt-auto">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold hover:text-gray-700"
        >
          <IoMdAdd className="text-lg" />
          <span>Assign Developer</span>
        </button>
      </div>

      {/* Add Subtask Modal */}
      <AssignToDeveloperModal open={open} setOpen={setOpen} taskId={_id} onAssignComplete={onTaskDeleted} />
    </div>
  );
};

export default TaskCard;
